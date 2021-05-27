import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sid-bar',
  templateUrl: './sid-bar.component.html',
  styleUrls: ['./sid-bar.component.scss']
})
export class SidBarComponent  {

  public name: string = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
  this.name = localStorage.getItem('name') || '';
}



}
