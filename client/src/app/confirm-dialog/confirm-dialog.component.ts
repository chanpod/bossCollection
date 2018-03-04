import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

var defaultMessage = "Are you sure you want to delete this?";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  message: String;
  defaultMessage: String;


  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.message = this.data.message || "Are you sure you want to do this?";
  }

  ngOnInit() {


  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  Cancel() {
    this.dialogRef.close(false);
  }

  Save() {
    this.dialogRef.close(true);
  }

}
