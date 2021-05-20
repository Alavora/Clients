import { PublicDataService } from 'src/app/core/services/public-data.service';
import { Product } from './../../core/models/product';
import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgAnalyzedFile } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
interface Unit {
  value: string;
  viewValue: string;
}

export interface Transaction {
  id: number;
  product: string;
  price: number;
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
    constructor(private route: ActivatedRoute, private publicService: PublicDataService ) {

    this.dataSource = new MatTableDataSource(this.transactions);
  }
  units: Unit[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any;
  //quantity: number = 0;
  public shopid: any;
  public totalPrice: number = 0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['product', 'price', 'quantity', 'unit'];
  transactions: Transaction[] = [
    {id: 5, product: 'Beach ball', price: 4},
    {id: 1, product: 'Towel', price: 5},
    {id: 3, product: 'Frisbee', price: 2},
    {id: 8, product: 'Sunscreen', price: 4},
    {id: 9, product: 'Cooler', price: 25},
    {id: 2, product: 'Swim suit', price: 15},
  ];


  ngOnInit(): void {
   /*  this.publicService.getUnits().subscribe(data =>{
      //this.units = data;

      console.log(data);
    }) */
    this.units = [
      {value:'a', viewValue:'a' },
      {value:'b', viewValue:'b' },
      {value:'c', viewValue:'c' },
      {value:'d', viewValue:'d' }

    ];
        this.shopid = this.route.snapshot.paramMap.get('id');

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
    this.transactions = this.dataSource;
  }

addToBasket(event: any, id: any){
  const unit = event.value;
if(this.quantity.value){
  const quantity = Number(this.quantity.value);
    if(isNaN(quantity)){
      console.log('not number');
    }else{
      this.publicService.postItemToBasket(id,quantity,unit ).subscribe(res=>{
        console.log(res);
      })
    }

}
console.log(id,this.quantity.value);
}

}
