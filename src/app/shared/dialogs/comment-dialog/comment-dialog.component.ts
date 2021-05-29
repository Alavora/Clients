import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/home/products/products.component';
/**
 * define component and its file of style and template
 */
@Component({
  selector: 'app-okdialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
})
/** define the class  */
export class commentDialog {
  /**
   * constructor
   * @param dialogRef define the dialog ref to handle it
   * @param data data to return
   */
  constructor(
    public dialogRef: MatDialogRef<commentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  /** when click ok then return the entered text */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
