import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public RegisterFormGroup: FormGroup;
  public passwordsMatch: boolean;

  constructor() { }

  ngOnInit() {
    this.RegisterFormGroup = new FormGroup({
      Email: new FormControl(''),
      Password: new FormControl('', [Validators.required]),
      PasswordVerify: new FormControl('')
    });

    this.passwordsMatch = true;

    this.passwordListener();
    this.passworVerifydListener();
  }

  passwordsMatchValidator() { 
    let passwordControl = this.RegisterFormGroup.controls.Password;
    let passwordVerifyControl = this.RegisterFormGroup.controls.PasswordVerify;

    if (passwordVerifyControl.value != passwordControl.value) {
      this.passwordsMatch = false;      
    }
    else {

      this.passwordsMatch = true;
    }

  }

  passwordListener() {
    let passwordControl = this.RegisterFormGroup.controls.Password;

    passwordControl.valueChanges.subscribe(
      (newPasswordValue) => {

        this.passwordsMatchValidator();
      }
    )
  }

  passworVerifydListener() {
    let passwordVerifyControl = this.RegisterFormGroup.controls.PasswordVerify;

    passwordVerifyControl.valueChanges.subscribe(
      (newPasswordValue) => {

        this.passwordsMatchValidator();
      }
    )
  }



}
