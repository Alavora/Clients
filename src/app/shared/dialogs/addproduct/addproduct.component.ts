import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/** interface of the Dialog */
export interface DialogData {
  /** quantoty of products */
  qty: number;
  /** price of product */
  price: number;
  /** unit of the desired product */
  unit: string;
}
/** definition of component and its style url and tenplate url */
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
/** drfine the class */
export class AddproductComponent {
  /**
   *constructor
   * @param dialogRef this is the dialogref
   * @param data injected data from products component
   */
  constructor(
    public dialogRef: MatDialogRef<AddproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  /**
   * when click ok then return the entered text
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /**
   * Calculate the price
   * @returns the price
   */
  getPrice(): number {
    return this.data.qty * this.data.price;
  }
}
