import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

/**
 * define the component and its style url and template url
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
/** DEFINE THE CLASS */
export class HomeComponent {
  /**
   * Constructor
   * @param breakpointObserver this inject breakpoint of the screen size
   */
  constructor(private breakpointObserver: BreakpointObserver) {}
}
