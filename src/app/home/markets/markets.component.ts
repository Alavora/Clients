import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PublicDataService } from 'src/app/core/services/public-data.service';
import { Market } from 'src/app/core/models/market';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
/**this to load markets data */
export class MarketsComponent  implements OnInit {
  public markets: Market[] = [];

  /** inject router to get id of market */
  constructor(private publicService : PublicDataService ,private router: Router ) {

  }
  ngOnInit():void {
    /** on init call this method */
    this.getMaerkets();
  }
  /** method to get dades from a service */
  getMaerkets(): void{
     this.publicService.getMarkets()
      .subscribe(data =>{
        this.markets = data
      } );

  }
  /** will navigate to selected shop */
  onNavigate(id: string){
    const idR = Number(id);
    this.router.navigateByUrl('markets/shop/' + id);
  }
}
