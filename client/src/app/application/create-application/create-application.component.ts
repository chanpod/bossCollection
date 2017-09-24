import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { BlizzardService } from '../../services/blizzard.service';
import { GuildService } from '../../services/guild.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  CreateAppFormGroup: FormGroup;
  user: any;
  application: {
    character: string,
    realm: string,
    desiredRole: string,
    guildName: string,
    comments: string,
    previousGuild: string,

  };
  characterIsValid: boolean = false;
  roles: Array<any>;
  iconColor: string;
  icon: string;
  realms: Array<any>


  constructor(
    private userService: UserService,
    private blizzardService: BlizzardService,
    private guildService: GuildService
  ) {
    this.characterIsValid = false;

    this.validateCharacter = this.validateCharacter.bind(this);
  }

  ngOnInit() {

    this.iconColor = "red";
    this.icon = "cancel";

    this.application = {
      character: "",
      realm: "",
      desiredRole: "",
      guildName: "TBD",
      previousGuild: '',
      comments: ''
    };

    this.CreateAppFormGroup = new FormGroup({
      character: new FormControl('', this.validateCharacter),
      realm: new FormControl(),
      previousGuild: new FormControl(),
      desiredRole: new FormControl('', Validators.required),
      comments: new FormControl()
    })

    this.blizzardService.getRealms()
      .subscribe((realms) => {
        this.realms = realms.realms;
      })

  }

  checkCharacterName() {

    this.iconColor = "red";
    this.icon = "cancel";
    this.characterIsValid = false;

    let character = this.CreateAppFormGroup.controls.character.value;
    let realmName = this.CreateAppFormGroup.controls.realm.value;

    this.blizzardService.getCharacter(realmName, character)
      .subscribe((result) => {
        console.log(result);

        this.iconColor = "green";
        this.icon = "check_circle";
        this.characterIsValid = true;

        this.CreateAppFormGroup.controls.character.updateValueAndValidity();

      }, (error) => {
        console.log(error);
      })
  }

  validateCharacter(c: FormControl) {

    if (this.characterIsValid == true) {
      return null;
    }
    else {
      return {
        validateCharacter: {
          valid: false
        }
      }
    }

  }

  submitApplication() {
    let formGroup = this.CreateAppFormGroup.value;
    this.application = {
      guildName: this.application.guildName,
      ...formGroup
    };

    this.guildService.submitApplication(this.application)
      .subscribe((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      })
  }

}