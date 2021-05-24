import { environment } from './../../../environments/environment';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
export interface login{
  access_token: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }




    // tslint:disable-next-line: typedef
    login(email: string, password: string){
      /* this.http.get('alavora.cat/sanctum/csrf-cookie').pipe(tap(res=>{
        console.log(res);
      })); */
      const url = 'https://alavora.cat/api/login';
      console.log({email, password});
      return this.http.post<login>(url, { email, password}).pipe(tap(res => {
        localStorage.setItem('token', res.access_token);

      }));
  }

  // tslint:disable-next-line: typedef
  register(name: string, lastname: string, username: string, email: string, password: string){
    const url = 'end';
    // tslint:disable-next-line: max-line-length
    return this.http.post<{access: string}>(url, {name, lastname, username, email, password}).pipe(tap(res => {

  }));
  }

  // tslint:disable-next-line: typedef
  checkLoggedIn(jwt: string){
    const url = 'https://alavora.cat/api/me';

    return this.http.get(url).pipe(catchError(error => {
      if (error.error instanceof ErrorEvent) {

      } else {

      }
     return observable.toString();
  }),tap(res => {

    },(error) =>{

        }));

  }
  }
