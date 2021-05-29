/** imports */
import { environment } from './../../../environments/environment';
import { Market } from './../models/market';
import { Shop } from './../models/shop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
/** Injectable to this class */
@Injectable({
  providedIn: 'root',
})

/**
 * handle api requests to get different data.
 */
export class PublicDataService {
  /**
   * define api
   */
  private url = environment.API_URL;
  /**
   * constructor
   * @param http tool to connet to http protocol
   */
  constructor(private http: HttpClient) {}
  /**
   * to get all markets exists
   * @returns  async response
   */
  public getMarkets(): Observable<Market[]> {
    const url = this.url + 'markets';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }
  /**
   * get shop by id
   * @param id id of specific shop
   * @returns an json array of the shop
   */
  public getShopsByID(id: number): Observable<Shop[]> {
    const url = this.url + 'shops';
    return this.http
      .get(url, { params: { market_id: id } })
      .pipe(map((result: any) => result.data));
  }

  /**
   * get all shops
   * @returns a json array of shops
   */
  public getShops(): Observable<Shop[]> {
    const url = this.url + 'shops';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }
  /**
   * gte product of one shop
   * @param id id of the shop
   * @returns the products of that shop
   */
  public getProductByShopID(id: number) {
    const id_shop = Number(id);
    const url = this.url + 'products';
    return this.http
      .get(url, { params: { shop_id: id_shop } })
      .pipe(map((result: any) => result.data));
  }

  /**
   * get all baskets
   * @returns all baskets of current user
   */

  getBaskets() {
    const url = this.url + 'baskets/all';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  /**
   * get all units
   * @returns all units
   */
  getUnits() {
    const url = this.url + 'units';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }
  /**
   * add item to basket
   * @param product_id product id
   * @param quantity quantity
   * @param unit_id unit id
   * @returns returns ths status of adding product to basket
   */
  postItemToBasket(product_id: number, quantity: number, unit_id: number) {
    const url = this.url + 'baskets/addproduct';
    return this.http.post<any>(url, { quantity, product_id, unit_id }).pipe();
  }
  /**
   * confirm basket
   * @param shop_id confirm basket
   * @returns ths status of post request
   */
  postBasket(shop_id: number) {
    const url = this.url + 'baskets/confirm';
    return this.http.post<any>(url, { shop_id }).pipe();
  }
  /**
   * add commnet to basket
   * @param shop_id the shop id
   * @param comments the string of comment
   * @returns the status of adding a comment to basket
   */
  potsComment(shop_id: number, comments: string) {
    const url = this.url + 'baskets/comment';
    return this.http.post<any>(url, { shop_id, comments }).pipe();
  }
}
