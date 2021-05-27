import { Router } from '@angular/router';
import { Baskets } from './../../core/models/baskets';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PublicDataService } from 'src/app/core/services/public-data.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Baskets>;
  dataSource: any;

  basketItems: Baskets[] = [];

public items: any[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['shop_name', 'quantity', 'details'];

  constructor(private publicService: PublicDataService, private router: Router) {
  }
  ngOnInit(): void {

this.publicService.getBaskets().subscribe(data=>{
  this.basketItems = data;
  console.log(this.basketItems);
  this.dataSource = new MatTableDataSource(this.basketItems);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  this.table.dataSource = this.dataSource;
  });
}

getBasketLength(id: number): number{
  let length = 0;
  this.basketItems.forEach(element=>{
    if (element.basket_id == id ){
      length = element.items.length;
    }
  });
  return length;
}


showDetails(id: number){
  this.router.navigateByUrl(this.router.url + '/' + id  +'/details');

}

}
