import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/core/services/public-data.service';
import { Market } from 'src/app/core/models/market';
/**
 * define component
 */
@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
/**this to load markets data */
export class MarketsComponent implements OnInit {
  /** where to store markets */
  public markets: Market[] = [];

  /**
   * constructor
   * @param publicService inect this service to be possible to connect to webs service
   * @param router this handles the extract of elements from url
   */
  constructor(
    private publicService: PublicDataService,
    private router: Router
  ) {}
  /** when page loads */
  ngOnInit(): void {
    /** on init call this method */
    this.getMaerkets();
  }
  /** method to get dades from a service */
  getMaerkets(): void {
    this.publicService.getMarkets().subscribe((data) => {
      this.markets = data;
    });
  }
  /**
   * will navigate to selected shop
   * @param id its the id of the shop will be extracted from url
   */
  onNavigate(id: string) {
    const idR = Number(id);
    this.router.navigateByUrl('markets/shop/' + id);
  }
}
