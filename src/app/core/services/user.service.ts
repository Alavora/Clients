import { environment } from './../../../environments/environment';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
export interface login {
  access_token: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = environment.API_URL;

  /** this will send a post request to web server to get back and save the access token in cookies or in lcoalstorage */
  login(email: string, password: string) {
    const url = this.url + 'login';
    return this.http.post<any>(url, { email, password }).pipe(
      catchError((error) => {
        return observable.toString();
      }),
      tap((res) => {})
    );
  }

  /** this will post new user to web service
   * @returns variable obervable
   *  */
  register(
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ) {
    const url = 'end';
    // tslint:disable-next-line: max-line-length
    return this.http
      .post<{ access: any }>(url, { name, lastname, username, email, password })
      .pipe(tap((res) => {}));
  }

  /**
   * to check if the user is connetced and the token is valid
   * @param jwt this param contains the token
   * @returns  return true or false as string
   */
  checkLoggedIn(jwt: string) {
    const url = this.url + 'me';

    return this.http.get(url).pipe(
      catchError((error) => {
        if (error.error instanceof ErrorEvent) {
        } else {
        }
        return observable.toString();
      }),
      tap(
        (res) => {},
        (error) => {
          console.clear();
        }
      )
    );
  }
  /**
   * get user data name, adress ... and later will save them in local storage
   * @returns  obervable
   */
  getUserdata(): Observable<User> {
    const url = this.url + +'me';

    return this.http.get(url).pipe(map((result: any) => result));
  }
  /**
   * to update the user profile
   * @param name name of the new user
   * @param email email
   * @param address adress
   * @param password password not required
   * @returns the response
   */
  postProfile(name: string, email: string, address: string, password: string) {
    const url = this.url + 'me/update';
    if (password) {
      return this.http
        .post<any>(url, { name, email, address, password })
        .pipe();
    } else {
      return this.http.post<any>(url, { name, email, address }).pipe();
    }
  }
  /**
   * to register a new user
   * @param name name
   * @param email email
   * @param password password
   * @param address adress
   * @param phone phone
   * @returns response
   */
  postUser(
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string
  ) {
    const url = this.url + 'register';
    return this.http.post<any>(url, { name, email, address, password, phone });
  }
  /**
   *  to logout from web service
   * @returns observable response
   */
  putLogOut() {
    const url = this.url + 'logout';
    const token = 'Bearer' + localStorage.getItem('token');
    return this.http.put(url, { token }).pipe();
  }
}
