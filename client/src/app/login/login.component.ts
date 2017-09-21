import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router';


import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private LoginForm: FormGroup;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {

    this.LoginForm = new FormGroup({
      Name: new FormControl(''),
      Password: new FormControl('')
    });

    this.userService.user.subscribe((user)=>{
      if(user.name != undefined){
        this.router.navigate(['']);
      }
    })
  }

  login() {

    this.userService.login(this.LoginForm.controls.Name.value, this.LoginForm.controls.Password.value)

  }

}
