import { PublicDataService } from 'src/app/core/services/public-data.service';
import { Product } from './../../core/models/product';
import {  Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { commentDialog } from 'src/app/dialogs/comment-dialog/comment-dialog.component';
import { OkdialogComponent } from 'src/app/dialogs/okdialog/okdialog.component';
import { Unit } from 'src/app/core/models/unit';
import { ThrowStmt } from '@angular/compiler';
import { AddproductComponent } from 'src/app/dialogs/addproduct/addproduct.component';

/** interface of Unit */

/** interface of comment dialog */
export interface DialogData{
  name: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public qty!: number;

  /** to guard value of object of the input  */
  quantity :any;

  /** constructor of the class */
    constructor(private route: ActivatedRoute, private publicService: PublicDataService, public dialog: MatDialog, private router: Router, private fb: FormBuilder) {

  }
  // units: Unit[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('table')table!:any;
  /**contains datatable */
  dataSource: any;
  /**on to save the comment */
  comment: any;
/** to save the shop_id */
public shopid: any;
public units: any[] = [];

public unit!: number;

public unitSymbol: string= '';

public price: number = 0;

  /** to save the total price */
  public totalPrice: number = 0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'price', 'unit', 'action'];
  /**where to save product listreturned from api request  */
  products: Product[] = [
  ];

  /** when page trigerred */
  ngOnInit(): void {
    this.shopid = this.route.snapshot.paramMap.get('id');
   /*  this.publicService.getUnits().subscribe(data =>{
      this.units = data;
    }); */
    /** sends the api calls */
    this.publicService.getProductByShopID(this.shopid).subscribe(data=> {
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.products.forEach(element => {
        this.units.push(element.units);
      });
      console.log(this.units);


      this.dataSource.paginator = this.paginator;

    })

    this.publicService.getBasket().subscribe(res=>{
      console.log(res);
    })


  }

   /** method to filter table */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource = this.dataSource
  }

  /** method to add item to basket this will send request of post to backend */

setUnit(product: Product, event: any){

  let unit = event.value;
  let index = 0;
  this.products[index].units.forEach(elem=>{
    if(elem.viewValue === unit){
      this.products[index].price = elem.price;
      this.price = elem.price;
      this.unit = Number(elem.id);
      this.unitSymbol = elem.symbol;
    }
    index = index +1 ;
  });


//  this.addProduct(event.value);

  /** this will find the id of the unit*/

/* if(this.quantity !== undefined){
  const quantity = Number(this.quantity.value);
    if(isNaN(quantity)){
      this.openOkDialog('Error!', 'The quantity has to be a number!');
    }else{
      if(quantity > 0){
      this.publicService.postItemToBasket(this.shopid, quantity, unit).subscribe((res)=>{
        this.disabled = false;
        this.quantity = NaN;
        this.totalPrice = this.totalPrice + (Number(price) * quantity);
        this.openOkDialog('Success!', 'You have added the item to the basket!');
      },
      (error) => {
        this.disabled = true;
        this.openOkDialog('Error!', 'An error occured when adding the item to basket!');
      });
      }else{
        this.openOkDialog('Error!', 'The quantity can\'t be negative or equals to 0!');
      }
    }

    } */



}



/** to open dialgo where to add comment */
openDialog(): void {
  const dialogRef = this.dialog.open(commentDialog, {
    width: '250px',
    data: {name: this.comment}
  });
  /** after the close of the dialog will add comment */
  dialogRef.afterClosed().subscribe(result => {
     this.comment = result;
      this.publicService.potsComment(this.shopid, this.comment).subscribe(res=>{});
      this.openOkDialog('Comment Added', 'Your Have Added The comment!');

  }, (error) =>{
    this.openOkDialog('Error!', 'An error occured when adding the comment!');

  });
}
/** method to add item to basket thiw will be called from button in Action column. */
addProduct(){

    if(!this.unit){
      this.openOkDialog('Error!', 'You have to select an unit!');
    }else{
  const dialogRef = this.dialog.open(AddproductComponent, {
    width: '250px',
    data: {quantity: this.qty, price: this.price, unit:this.unitSymbol}
  });
  /** after the close of the dialog will add comment */
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    /*   this.publicService.potsComment(this.shopid, this.comment).subscribe(res=>{}); */
    if(result === undefined){
      this.openOkDialog('Error!', 'An error occured when adding the item!');
    }else{

        this.publicService.postItemToBasket(this.shopid, result, this.unit).subscribe((res)=>{
          this.openOkDialog('Success!', 'You have added the item to the basket!');
          this.totalPrice = this.totalPrice + result * this.price;

        },
        (error) => {
          this.openOkDialog('Error!', 'An error occured when adding the item to basket!');
        });


    }

  }, (error) =>{
    this.openOkDialog('Error!', 'An error occured when adding the item!');

  });
}
}



  /** to confirm basket */
confirmBasket(){
  this.publicService.postBasket(this.shopid).subscribe((res)=>{
    this.openOkDialog('Purchase Confirmed', 'You have added the purchase and it will be processed soon!');
    this.router.navigateByUrl('baskets');

  },
  (error) => {
    this.openOkDialog('Error!', 'An error occured when confirming the basket!');

  });
}



/** to open a dialog shows different message ! depends on the situation */

openOkDialog(title: string, content: string) {
  let dialogRef = this.dialog.open(OkdialogComponent);
  dialogRef.componentInstance.title = title;
  dialogRef.componentInstance.content = content;
}





}

