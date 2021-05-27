import { Baskets } from './../../../core/models/baskets';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Basket } from 'src/app/core/models/basket';
import { PublicDataService } from 'src/app/core/services/public-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Basket>;
  dataSource: any;
  products : Basket[] = [];
  basketItems : any;
  shop_id: any ;
  displayedColumns = ['product_name', 'quantity', 'price', 'product'];

  constructor(private publicService: PublicDataService, private router: Router,  private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }

  showDetails(id: number){

  }


  getData(){
    this.publicService.getBaskets().subscribe(data=>{
      this.basketItems = data;
      this.shop_id = this.route.snapshot.paramMap.get('id');
      this.products = this.basketItems.items;
      console.log(this.products);
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      });
  }



}
