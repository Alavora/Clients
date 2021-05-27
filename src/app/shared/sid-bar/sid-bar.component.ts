import { PublicDataService } from 'src/app/core/services/public-data.service';
import { UserService } from './../../core/services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Location} from '@angular/common';
/** decalration of this component */
@Component({
  selector: 'app-sid-bar',
  templateUrl: './sid-bar.component.html',
  styleUrls: ['./sid-bar.component.scss']
})
/** class */
export class SidBarComponent  implements OnInit{
  public token: string = '';
  public name: string = '';
  /** handles the changement of the screen size */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  /** to hide elements from no logged in users */
public enabled = false;
/** to show the number of items in basket  */
public basketItemsLength = 0;
/** constructor */
constructor(private breakpointObserver: BreakpointObserver, private router: Router, public user: UserService, private publicData: PublicDataService, private location: Location) {
  this.name = localStorage.getItem('name') || '';
}
/** when the app loads will call those methods  */
ngOnInit():void{
  /** method of checking user */
  this.checkPermission();
  /** methods of getting items number in basket */
  this.getBasketLength();

}

/** this will check if a user is connected or no and will assign a boolean to the variable enabled */
checkPermission(){
  let user: any ;
  this.token = localStorage.getItem('token') || '';
  if(!this.token){
    this.enabled = false;
  }else{
    this.user.checkLoggedIn(this.token).subscribe(res=>{
      user = res;
      if(user.id>0){

        this.enabled = true;
      }else{
        this.enabled = false;
      }
    });
  }
}
/** will delete all user information from localstorage nd will call a end point api to disable the currrent token */
logOut(){
  this.user.putLogOut().subscribe(res=>{
    localStorage.clear();
  });

}
/** will assign a number to basketItemslenght */
getBasketLength(){
  let basketItems: any;
  this.publicData.getBaskets().subscribe(res=>{
    basketItems = res;
    this.basketItemsLength = basketItems.length;
  });
}
  /** will navigate to baskets page */
navigateTo(){
  this.router.navigateByUrl('/baskets');

}
/** goback to previous page */
goBack(){
  this.location.back();
}
}
