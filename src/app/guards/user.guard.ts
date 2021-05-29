import { UserService } from './../core/services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { observable, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IntercepterService } from '../core/services/intercepter.service';
//import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  token!: string;
  constructor(private router: Router, private user: UserService) {}
  /**
   * returns true of false of status of user if is connetced or no
   * @param route router of the current component handled by angular
   * @param state internal component of angular routes
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.token = localStorage.getItem('token') || '';

    if (!this.token) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return this.user.checkLoggedIn(this.token).pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
          } else {
          }
          return observable.toString();
        }),
        map((res: any) => {
          if (res['id'] > 0) {
            return true;
          } else {
            console.clear();
            this.router.navigateByUrl('/login');

            return false;
          }
        })
      );
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return false;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.token = localStorage.getItem('token') || '';
    let response = true;

    return response;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return false;
  }
}
