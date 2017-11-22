import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'imageUrl',
    templateUrl: 'imageUrl.html',
  })
  export class ImageUrlDialog {

    public url:string;

    constructor(
      public dialogRef: MatDialogRef<ImageUrlDialog>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any
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