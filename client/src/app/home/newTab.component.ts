import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
    selector: 'newTabDialog',
    templateUrl: 'newTabDialog.html',
  })
  export class NewTabDialog {

    public title:string;

    constructor(
      public dialogRef: MatDialogRef<NewTabDialog>,
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
  
  }