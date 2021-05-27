import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData{
  qty: number;
  price:number;
  unit: string;
}
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent  {

  constructor(
    public dialogRef: MatDialogRef<AddproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    /** when click ok then return the entered text */
  onNoClick(): void {
    this.dialogRef.close();
  }

  getPrice(): number{
    return this.data.qty * this.data.price;
  }
}
