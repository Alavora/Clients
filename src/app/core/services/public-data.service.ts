import { environment } from './../../../environments/environment';
import { Market } from './../models/market';
import { Shop } from './../models/shop';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PublicDataService {






  private url = environment.API_URL;
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



  public getProductByShopID(id: number)  {
    const id_shop = Number(id);
    const url = this.url + 'products';
    return this.http.get(url,{params:{shop_id: id_shop}}).pipe(map((result: any) => result.data));
  }



  public getProducts(){
    const url = this.url + 'products';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  getBaskets(){
    const url = this.url + 'baskets/all';
    return this.http.get(url).pipe(map((result: any) => result.data));

  }

  getUnits(){
    const url = this.url + 'units';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  postItemToBasket(product_id:number, quantity:number, unit_id:number){

    const url = this.url + 'baskets/addproduct';
     return this.http.post<any>(url,{quantity, product_id, unit_id}).pipe();
  }

  postBasket(shop_id: number){
    const url = this.url + 'baskets/confirm';
     return this.http.post<any>(url, {shop_id}).pipe();
  }

  potsComment(shop_id: number, comments: string){
        console.log(shop_id);
        const url = this.url + 'baskets/comment';
         return this.http.post<any>(url,{shop_id,comments}).pipe();

  }




}
