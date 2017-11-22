import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {UserService} from '../services/user.service';

@Component({
    selector: 'resetPasswordDialog',
    templateUrl: 'resetPasswordDialog.html',
  })
  export class ResetPasswordDialogComponent {

    public title:string;
    public email:string;

    constructor(
      public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
      private userService:UserService,
      private toastr:ToastsManager
      // @Inject(MAT_DIALOG_DATA) public data: any
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