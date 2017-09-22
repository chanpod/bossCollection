import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { BlizzardService } from '../../services/blizzard.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  CreateAppFormGroup: FormGroup;
  user: any;
  application: {
    characterName: string,
    realm: string,
    desiredRole: string
  };
  characterIsValid: boolean = false;
  roles: Array<any>;
  iconColor: string;
  icon: string;
  realms: Array<any>


  constructor(
    private userService: UserService,
    private blizzardService: BlizzardService
  ) { 
    this.characterIsValid = false;

    this.validateCharacter = this.validateCharacter.bind(this);
  }

  ngOnInit() {
    
    this.iconColor = "red";
    this.icon = "cancel";

    this.application = {
      characterName: "",
      realm: "",
      desiredRole: ""
    };

    this.CreateAppFormGroup = new FormGroup({
      characterName: new FormControl('', this.validateCharacter),
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

    let characterName = this.CreateAppFormGroup.controls.characterName.value;
    let realmName = this.CreateAppFormGroup.controls.realm.value;

    this.blizzardService.getCharacter(realmName, characterName)
      .subscribe((result) => {
        console.log(result);
        
        this.iconColor = "green";
        this.icon = "check_circle";        
        this.characterIsValid = true;

        this.CreateAppFormGroup.controls.characterName.updateValueAndValidity();

      }, (error) => {
        console.log(error);
      })
  }

  validateCharacter(c: FormControl) {
  
    if(this.characterIsValid == true){
      return null;
    }
    else{
      return {
        validateCharacter: {
          valid:false
        }
      }
    } 

  }

}