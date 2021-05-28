import { Router } from '@angular/router';
import { Baskets } from './../../core/models/baskets';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PublicDataService } from 'src/app/core/services/public-data.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent implements OnInit {
  /** handles paginator */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /** angular mat table */
  @ViewChild(MatTable) table!: MatTable<Baskets>;
  /** data to show in the angular material table */
   dataSource: any;
  /** array to strore baskets list */
  basketItems: Baskets[] = [];


public items: any[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['shop_name', 'quantity', 'details'];

  constructor(private publicService: PublicDataService, private router: Router) {
  }
  /** when app loads */
  ngOnInit(): void {
    this.getData();

}
  /** returns the basket items length. */
getBasketLength(id: number): number{
  let length = 0;
  this.basketItems.forEach(element=>{
    if (element.basket_id == id ){
      length = element.items.length;
    }
  });
  return length;
}
/** call the get method to get all the confirmed baskets of the client. */
getData(){
  this.publicService.getBaskets().subscribe(data=>{
    this.basketItems = data;
    console.log(this.basketItems);
    this.dataSource = new MatTableDataSource(this.basketItems);
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    });
}

/** redirect to page where the client can find all products from the same seller. */
showDetails(id: number){
  this.router.navigateByUrl(this.router.url + '/' + id  +'/details');

}

}
