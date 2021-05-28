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
/** contains all units */
public units: any[] = [];
/** add unit id */
public unit!: number;
/** CONTAINS THE symbol view */
public unitSymbol: string= '';
/** price of one product */
public price: number = 0;

/** id general of selected product */

public id_product = 0;

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

    /** sends the api calls */
    this.publicService.getProductByShopID(this.shopid).subscribe(data=> {
      this.products = data;
      console.log(data);
       this.dataSource = new MatTableDataSource(this.products);


      this.dataSource.paginator = this.paginator;

    });
  }

   /** method to filter table */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource = this.dataSource
  }

  /** method to add item to basket this will send request of post to backend */

setUnit(product: Product, event: any){
  this.id_product = product.id;
  let unit = event.value;
  console.log(unit)
  console.log(product.id);
  this.unit = 0;
  this.unitSymbol = '';


  this.products.forEach(prod=>{
    if(prod.id === product.id){
      prod.units.forEach(un =>{
        if(un.viewValue === unit){
          this.price = un.price;

          prod.price = un.price;
          this.unit = Number(un.id);
          this.unitSymbol = un.symbol;
        }
      });
    }
  })






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
     if(this.comment){
      this.publicService.potsComment(this.shopid, this.comment).subscribe(res=>{});
      this.openOkDialog('Comment Added', 'Your Have Added The comment!');
     }else{
      this.openOkDialog('Notice!', 'You didn\'t add the comment!');
     }
     this.comment = '';

  }, (error) =>{
    this.openOkDialog('Error!', 'An error occured when adding the comment!');

  });
}
/** method to add item to basket thiw will be called from button in Action column. */
addProduct(product: any){

    if(!this.unit || product.id !== this.id_product){
      this.openOkDialog('Error!', 'You have to select an unit!');
    }else{
  const dialogRef = this.dialog.open(AddproductComponent, {
    width: '250px',
    data: {quantity: this.qty, price: this.price, unit:this.unitSymbol}
  });
  /** after the close of the dialog will add comment */
  dialogRef.afterClosed().subscribe(result => {
    /*   this.publicService.potsComment(this.shopid, this.comment).subscribe(res=>{}); */
    if(result === undefined){
      this.openOkDialog('Error!', 'An error occured when adding the item!');
    }else{

        this.publicService.postItemToBasket(this.shopid, result, this.unit).subscribe((res)=>{
          this.openOkDialog('Success!', 'You have added the item to the basket!');
          this.totalPrice = this.totalPrice + result * this.price;
          this.unitSymbol = '';
          this.unit = 0;
          this.price = 0;

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

