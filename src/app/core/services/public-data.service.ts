import { Market } from './../models/market';
import { Shop } from './../models/shop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicDataService {
  private url = 'http://alavora.cat/api/'
  constructor(private http: HttpClient) { }

  public getMarkets() :Observable<Market[]> {
    const url = this.url  + 'markets';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }


  public getShopsByID(id: number):Observable<Shop[]> {
    const url = this.url + 'shops' ;
    return this.http.get(url,{params:{market_id: id}}).pipe(map((result: any) => result.data));
  }


  public getShops():Observable<Shop[]> {
    const url = this.url + 'shops';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }



  public getProductByShopID(id: number) {
    const url = this.url + 'products';
    return this.http.get(url,{params:{market_id: id}}).pipe(map((result: any) => result.data));
  }



  public getProducts(){
    const url = this.url + 'products';
    return this.http.get(url).pipe(map((result: any) => result));
  }



}
