import { UserService } from './../core/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {
  token!: string;
  constructor( private router: Router, private user: UserService){}
  /** to check if the user is logged in  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = localStorage.getItem('token') || '';



      if (!this.token){
        return true;
      }else{
      return this.user.checkLoggedIn(this.token)
      .pipe(map((res: any) => {
        if(res['id'] > 0){
          this.router.navigateByUrl('/');

          return false;

        }else{
          return true;
        }
      } )); }
    }
  }
