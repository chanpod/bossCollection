import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  CreateAppFormGroup: FormGroup;
  user: any;
  application: {
    characterName: "",
    realm: ""
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    this.CreateAppFormGroup = new FormGroup({
      characterName: new FormControl(),
      realm: new FormControl(),
      previousGuild: new FormControl(),
      desiredRole: new FormControl(),
      comments: new FormControl()
    })
  }

}
