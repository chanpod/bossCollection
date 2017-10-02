import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent> ) { }

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
