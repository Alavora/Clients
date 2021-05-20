import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }




    // tslint:disable-next-line: typedef
    login(email: string, password: string){
      this.http.get('alavora.cat/sanctum/csrf-cookie').pipe(tap(res=>{
        console.log(res);
      }));
      email = 'client1@example.com';
      password = 'password';
      const url = 'http://alavora.cat/login';
      console.log({email, password});
      return this.http.post<User>(url, { email, password}, { withCredentials: true }).pipe(tap(res => {
       /* localStorage.setItem('token', res.token); */
        console.log(res);
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
    const url = 'end';

    return this.http.post<{grant: boolean}>(url, {jwt}).pipe(tap(res => {
      console.log(res);
    }));
  }
}
