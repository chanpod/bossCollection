import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {UserService} from '../services/user.service';

@Component({
    selector: 'resetPasswordDialog',
    templateUrl: 'resetPasswordDialog.html',
  })
  export class ResetPasswordDialogComponent {

    private title:string;
    private email:string;

    constructor(
      public dialogRef: MdDialogRef<ResetPasswordDialogComponent>,
      private userService:UserService,
      private toastr:ToastsManager
      // @Inject(MD_DIALOG_DATA) public data: any
    ) { }
  
    onNoClick(): void {
      this.dialogRef.close(null);
    }

    Cancel(){
        this.dialogRef.close(null);
    }

    Save(){
      this.dialogRef.close(this.title);
    }

    sendResetEmail(){

      this.userService.resetPassword(this.email)
        .subscribe((response) => {

          this.toastr.success("An email has been sent with your new temporary password.", "Password reset");

          this.dialogRef.close();
        }, (error) => {
          this.toastr.error(error.json().message);
        })

    }
  
  }