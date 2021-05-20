import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops/shops.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MarketsComponent } from './markets/markets.component';
import { BasketsComponent } from './baskets/baskets.component';
import { ProductsComponent } from './products/products.component';


import {MatInputModule} from '@angular/material/input';

import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import { HttpClientXsrfModule } from '@angular/common/http';


@NgModule({
  declarations: [ShopsComponent, MarketsComponent, BasketsComponent, ProductsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'alavora_session',
    }),
  ]
})
export class HomeModule { }
