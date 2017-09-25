import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'newTabDialog',
    templateUrl: 'newTabDialog.html',
  })
  export class NewTabDialog {

    private title:string;

    constructor(
      public dialogRef: MdDialogRef<NewTabDialog>,
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
  
  }