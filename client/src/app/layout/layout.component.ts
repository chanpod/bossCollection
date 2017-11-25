import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { GuildService } from '../services/guild.service';

//3rd party

declare var gapi: any;

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  inputs: ['sidenav'],
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: any = undefined;
  guildName:string;
  sidenav: any;

  constructor(private userService: UserService, private guildService:GuildService) {

    this.guildName = this.guildService.getGuildContext();
    userService.user.subscribe((user) => {
      this.updateBasedOnUser(user);
    })
  }

  ngOnInit() {
    this.loadGoogleAuthAPI()
  }

  loadGoogleAuthAPI() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }

  updateBasedOnUser(user: any) {

    this.user = user;
  }

  logout(){
    this.userService.logout();
  }

}
