import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'imageUrl',
    templateUrl: 'imageUrl.html',
  })
  export class ImageUrlDialog {

    private url:string;

    constructor(
      public dialogRef: MdDialogRef<ImageUrlDialog>,
      @Optional() @Inject(MD_DIALOG_DATA) public data: any
    ) { 
      this.url = data;
    }
  
    onNoClick(): void {
      this.dialogRef.close(null);
    }

    Cancel(){
        this.dialogRef.close(null);
    }

    Save(){
      this.dialogRef.close(this.url);
    }
  
  }