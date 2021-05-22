import { PublicDataService } from 'src/app/core/services/public-data.service';
import { Product } from './../../core/models/product';
import {  Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { commentDialog } from 'src/app/dialogs/comment-dialog/comment-dialog.component';
import { OkdialogComponent } from 'src/app/dialogs/okdialog/okdialog.component';

/** interface of Unit */
interface Unit {
  id:number;
  view: string;
  viewValue: string;
}
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
    constructor(private route: ActivatedRoute, private publicService: PublicDataService, public dialog: MatDialog, private router: Router) {
  }
  units: Unit[] = [];
  /** to disable buttom of confirm  */
  disabled = true;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  /**contains datatable */
  dataSource: any;
  /**on to save the comment */
  comment: any;
/** to save the shop_id */
public shopid: any;
  /** to save the total price */
  public totalPrice: number = 0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'price', 'quantity', 'unit'];
  /**where to save product listreturned from api request  */
  products: Product[] = [
  ];

  /** when page trigerred */
  ngOnInit(): void {

    this.shopid = this.route.snapshot.paramMap.get('id');
    this.publicService.getUnits().subscribe(data =>{
      this.units = data;
    });
    /** sends the api calls */
    this.publicService.getProductByShopID(this.shopid).subscribe(data=> {
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;

    })

  }

   /** method to filter table */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource = this.dataSource
  }

  /** method to add item to basket this will send request of post to backend */

addToBasket(event: any, price: number){
  console.log(this.quantity);

  let unit = event.value;
  this.units.forEach(elem=>{
    if(elem.viewValue === unit){
      unit = Number(elem.id);
    }
  })
if(this.quantity.value){
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
        console.log('error');
        this.disabled = true;
        console.log('error');
        this.openOkDialog('Error!', 'An error occured when adding the item to basket!');
      });
      }else{
        this.openOkDialog('Error!', 'The quantity can\'t be negative or equals to 0!');
      }
    }

    }


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
    console.log('error');
    this.openOkDialog('Error!', 'An error occured when adding the comment!');

  });
}
  /** to confirm basket */
confirmBasket(){
  this.publicService.postBasket(this.shopid).subscribe((res)=>{
    console.log('done');
    this.openOkDialog('Purchase Confirmed', 'You have added the purchase and it will be processed soon!');
  },
  (error) => {
    console.log('error');
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

