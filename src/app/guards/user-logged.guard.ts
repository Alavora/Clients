import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {
  jwt!: string;
  constructor( private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.jwt = localStorage.getItem('token') || '';
      let response = true;
      if(this.jwt){
        console.log("adsd");

        if(this.jwt == '1234'){
          /*  return this.user.checkLoggedIn(this.jwt)
      .pipe(map((res: any) => res.grant )); */
          response =  false;
          //this.router.navigateByUrl('/');
        }
      }


      return true;
  }

}
