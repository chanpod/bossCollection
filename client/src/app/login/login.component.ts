import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../services/user.service';

import { ResetPasswordDialogComponent } from './resetPasswordDialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public LoginForm: FormGroup;
  public loading: boolean;
  constructor(
    private userService: UserService, 
    private router: Router, 
    public dialog: MdDialog,
    private toastr:ToastsManager) { }

  ngOnInit() {

    this.loading = false;

    this.LoginForm = new FormGroup({
      Name: new FormControl(''),
      Password: new FormControl('')
    });

    this.userService.user.subscribe((user) => {
      if (user.name != undefined) {
        this.router.navigate(['']);
      }
    })
  }

  openResetEmailDialog() {
    let dialogRef = this.dialog.open(ResetPasswordDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != null) {


      }
    });
  }

  login() {

    this.loading = true;

    this.userService.login(this.LoginForm.controls.Name.value, this.LoginForm.controls.Password.value)
      .subscribe((response) => {

        this.userService.getUser();
        this.loading = false;
      }, (error) => {

        this.loading = false;
        this.toastr.error(error.json().message);
      })


  }

}
