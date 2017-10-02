import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { UserService } from '../services/user.service';
import { GuildService } from '../services/guild.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { NewTabDialog } from './newTab.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

    user: any = {};
    tabs: Array<any> = [];
    editingTab: boolean = false;
    newTab: any = { title: '', content: '' }

    constructor(
        public userService: UserService,
        private guildService: GuildService,
        public toastr: ToastsManager,
        public dialog: MdDialog) {

    }

    ngOnInit() {

        this.editingTab = false;

        this.userService.user.subscribe((user) => {

            this.user = user;

            this.getTabs();

        })
    }

    openNewTabDialog(): void {
        let dialogRef = this.dialog.open(NewTabDialog, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result != null) {

                this.createTab(result);
            }
        });
    }


    saveTabs() {
        let guildName = this.user.guild.name;
        this.user.guild.tabs = this.tabs;

        this.guildService.updateTabs(this.user.guild, guildName)
            .subscribe((result) => {
                this.toastr.success("Successfully saved", "Saving Tabs");
                this.toggleEditing();
            }, (error) => {
                this.toastr.error("Uh oh. Something broke!", "Error");
            })
    }

    deleteTab(index) {
        let tabs = this.tabs;

        this.user.guild.tabs = tabs.splice(index, 1);

        this.saveTabs();
    }

    createTab(newTabName) {

        let tab = Object.assign(this.newTab);

        tab.title = newTabName
        this.tabs.push(tab);

        this.saveTabs();
    }

    getTabs() {

        let guildName = "";
        if (this.user.guild) {

            guildName = this.user.guild.name;
        }
        else {
            guildName = this.guildService.getGuildContext();
        }

        this.guildService.getTabs(guildName)
            .subscribe((response) => {

                this.tabs = response.guild.tabs;
            })
    }

    toggleEditing() {
        this.editingTab = !this.editingTab;
    }

}

