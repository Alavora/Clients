import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  jwt!: string;
  constructor( private router: Router){}
  /** check if the user is logged in  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.jwt = localStorage.getItem('token') || '';
      let response = false;

      if(!this.jwt){

        response =  false;
      }
     /*  return this.user.checkLoggedIn(this.jwt)
      .pipe(map((res: any) => res.grant )); */
      if(this.jwt == '1234'){
        response =  true;
      }
      if(!response){
        this.router.navigateByUrl('/login');
      }
      return response;
    }
    // return true;


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.jwt = localStorage.getItem('token') || '';
      let response = true;
      if(this.jwt){
        console.log("adsd");

        if(this.jwt == '1234'){
          /*  return this.user.checkLoggedIn(this.jwt)
      .pipe(map((res: any) => res.grant )); */

          response =  false;
        }
      }

      return response;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return false;
  }
}
