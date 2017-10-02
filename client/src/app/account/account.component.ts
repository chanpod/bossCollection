import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserService } from '../services/user.service';

//3rd party
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private AccountFormGroup: FormGroup;
  private account;
  private user: any;

  constructor(private userService: UserService, private toastr: ToastsManager) {
    this.userService.user.subscribe((user) => {
      this.user = user;

      this.initForm();
    })
  }

  ngOnInit() {

  }

  changePassword(){
    let currentPasswordControl = this.AccountFormGroup.controls.currentPassword;
    let newPasswordControl = this.AccountFormGroup.controls.newPassword;
    let confirmPasswordControl = this.AccountFormGroup.controls.confirmPassword;

    let body = {
      currentPassword: currentPasswordControl.value,
      newPassword: newPasswordControl.value,
      passwordVerify: confirmPasswordControl.value,
      ...this.user
    }

    this.userService.changePassword(body)
      .subscribe((result) => {
        this.toastr.success("Password Updated successfully", "Password Update");

        currentPasswordControl.setValue("");
        newPasswordControl.setValue("");
        confirmPasswordControl.setValue("");
      }, (error) => {

        let errorMessage = error.json();

        this.toastr.error(errorMessage.message, "Password Update");
        console.log(error);
      })
  }

  initForm() {

    this.AccountFormGroup = new FormGroup({
      name: new FormControl({ value: (this.user.name || ''), disabled: true}),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl(''),
      currentPassword: new FormControl(''),
      email: new FormControl({ value: (this.user.email || ''), disabled: false}),
      battleTag: new FormControl(''),
      avatarUrl: new FormControl(''),
      guild: new FormControl('')
    })

    
  }

}
