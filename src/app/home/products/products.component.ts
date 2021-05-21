import { PublicDataService } from 'src/app/core/services/public-data.service';
import { Product } from './../../core/models/product';
import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgAnalyzedFile } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { commentDialog } from 'src/app/dialogs/comment-dialog/comment-dialog.component';
interface Unit {
  id:number;
  view: string;
  viewValue: string;
}

export interface Transaction {
  id: number;
  product: string;
  price: number;
}

export interface DialogData{
  name: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  quantity = new FormControl('', [
    Validators.required
  ]);
    constructor(private route: ActivatedRoute, private publicService: PublicDataService, public dialog: MatDialog ) {

    this.dataSource = new MatTableDataSource(this.products);
  }
  units: Unit[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any;
  comment: any;
  //quantity: number = 0;
  public shopid: any;
  public totalPrice: number = 0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'price', 'quantity', 'unit'];

  products: Product[] = [
   /*  {id: 5, product: 'Beach ball', price: 4},
    {id: 1, product: 'Towel', price: 5},
    {id: 3, product: 'Frisbee', price: 2},
    {id: 8, product: 'Sunscreen', price: 4},
    {id: 9, product: 'Cooler', price: 25},
    {id: 2, product: 'Swim suit', price: 15}, */
  ];


  ngOnInit(): void {
    this.shopid = this.route.snapshot.paramMap.get('id');
    this.publicService.getUnits().subscribe(data =>{
      this.units = data;
      console.log(this.units);
    });
    console.log(this.shopid);
    this.publicService.getProductByShopID(this.shopid).subscribe(data=> {
      this.products = data;
    })




  /*   this.units = [
      {value:'a', viewValue:'a' },
      {value:'b', viewValue:'b' },
      {value:'c', viewValue:'c' },
      {value:'d', viewValue:'d' }

    ]; */

  }
  addProduct() {

  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    console.log('asd')
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.products = this.dataSource;
  }

addToBasket(event: any, id: number){
  let unit = event.value;
  this.units.forEach(elem=>{
    if(elem.viewValue === unit){
      unit = Number(elem.id);
    }
  })
if(this.quantity.value){
  const quantity = Number(this.quantity.value);
    if(isNaN(quantity)){
    }else{
      this.publicService.postItemToBasket(id,quantity,unit ).subscribe(res=>{
        console.log(res);
      });
    }

}
console.log(id,this.quantity.value);
}




openDialog(): void {
  const dialogRef = this.dialog.open(commentDialog, {
    width: '250px',
    data: {name: this.comment}
  });

  dialogRef.afterClosed().subscribe(result => {
     this.comment = result;
    console.log(this.comment);
  });
}





}

