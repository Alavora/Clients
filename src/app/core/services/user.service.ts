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
  private url = environment.API_URL;




    // tslint:disable-next-line: typedef
    login(email: string, password: string){
      /* this.http.get('alavora.cat/sanctum/csrf-cookie').pipe(tap(res=>{
        console.log(res);
      })); */
      const url = this.url + 'login';
      return this.http.post<any>(url, { email, password}).pipe(catchError(error => {
      return observable.toString();
    }),tap(res => {

      }));
  }

  // tslint:disable-next-line: typedef
  register(name: string, lastname: string, username: string, email: string, password: string){
    const url = 'end';
    // tslint:disable-next-line: max-line-length
    return this.http.post<{access: any}>(url, {name, lastname, username, email, password}).pipe(tap(res => {

  }));
  }

  // tslint:disable-next-line: typedef
  checkLoggedIn(jwt: string){
    const url = this.url + 'me';

    return this.http.get(url).pipe(catchError(error => {
      if (error.error instanceof ErrorEvent) {

      } else {

      }
     return observable.toString();
  }),tap(res => {

    },(error) =>{
     // console.clear()
        }));

  }


  getUserdata():Observable<User>{
    const url = this.url +  + 'me';

    return this.http.get(url).pipe(map((result: any) => result));
  }

  postProfile(name: string, email: string, adress:string, password:string){
    const url = this.url + 'me/update'
    if(password){
     return this.http.post<any>(url,{name,email,adress,password}).pipe();

    }else{
     return this.http.post<any>(url,{name,email,adress,password}).pipe();

    }
  }

  putLogOut(){
    const url = this.url + 'me/logout'
    const token = 'Bearer' +  localStorage.getItem('token');
    return this.http.put(url,{token}).pipe();
  }

  }
