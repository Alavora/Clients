import { Baskets } from './../../../core/models/baskets';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Basket } from 'src/app/core/models/basket';
import { PublicDataService } from 'src/app/core/services/public-data.service';
/** define component */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
/** define class */
export class DetailsComponent implements OnInit {
  /** table Pagination */
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  /** to save total price */
  totalPrice: number = 0;
  /** data for the table  */
  dataSource: any;
  /** where to store products which is basketItems.items */
  products: Basket[] = [];
  /** Items of basket   */
  basketItems: Baskets[] = [];
  /** to save id of shop */
  shop_id!: number;
  /** to store the name of the shop */
  shopName: string = '';
  /** where to save the status of the Purschased Basket */
  basketStatus: string = '';
  /**
   *constructor
   * @param publicService the injects the Public service api handles
   * @param route this will use it to extract id form url
   */
  constructor(
    private publicService: PublicDataService,
    private route: ActivatedRoute
  ) {}
  /** define the columns of the tabel */
  displayedColumns = ['product_name', 'quantity', 'total_price'];
  /** when the page loads  */
  ngOnInit(): void {
    this.getData();
  }

  /** get the data from the back end of the items of the basket  */
  getData() {
    this.publicService.getBaskets().subscribe((data) => {
      this.shop_id = Number(this.route.snapshot.paramMap.get('id'));

      this.basketItems = data;

      // this.products = this.basketItems[this.shop_id].items;
      this.basketItems.forEach((element) => {
        if (element.shop_id === this.shop_id) {
          this.shopName = element.shop_name;
          this.basketStatus = this.getStatusString(element.status);
          element.items.forEach((ele) => {
            this.products.push(ele);
            this.totalPrice = this.totalPrice + Number(ele.total_price);
          });
        }
      });

      /** assign all the revceived data to this variable which will show those datas in the table */
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }
  /**
   * will convert a status code to string
   * @param str contains the number of staus
   * @returns status as readable string
   */
  getStatusString(str: string): string {
    let response = '';
    switch (str) {
      case '0':
        response = 'UNCONFIRMED';
        break;
      case '1':
        response = 'CONFIRMED';
        break;
      case '2':
        response = 'PREPARING';
        break;
      case '3':
        response = 'READY';
        break;

      default:
        break;
    }
    return response;
  }
}
