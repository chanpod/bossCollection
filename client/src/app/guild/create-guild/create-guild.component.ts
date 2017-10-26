import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Services
import {GuildService} from '../../services/guild.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css']
})
export class CreateGuildComponent implements OnInit {

  CreateGuildFormGroup: FormGroup;  

  constructor(
    private guildService:GuildService,    
  ) {    

    this.CreateGuildFormGroup = new FormGroup({
      GuildName: new FormControl('', Validators.required)
    })
   }

  ngOnInit() {
  }

  createGuild(){
    this.guildService.createGuild(this.CreateGuildFormGroup.controls.GuildName.value)
      .subscribe(
        (result) => {
          alert("it worked");
        },
        (error) => {
          alert(error);
        }
      )
  }

}
