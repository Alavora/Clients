import { Shop } from './../../core/models/shop';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicDataService } from 'src/app/core/services/public-data.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent {
  index: number = 10;
  /** where we can save our list of shops */
  public shops: Shop[] = [];
  public idMarket: string = '';
  /**
   *
   * @param publicService the is a service that handles our api request
   * @param route will handle navigation to other url
   *  @param router  will handle the extraction of element id string... from url
   */
  constructor(
    private publicService: PublicDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  /** when the app loads */
  ngOnInit(): void {
    /** on init call this method */
    this.getShops();
  }
  /** method to get data from service [Public-data]*/
  getShops(): void {
    this.idMarket = this.route.snapshot.paramMap.get('id') || '';
    if (this.idMarket) {
      const id = Number(this.idMarket);
      this.publicService.getShopsByID(id).subscribe((data) => {
        this.shops = data;
      });
    } else {
      this.publicService.getShops().subscribe((data) => {
        this.shops = data;
      });
    }
  }

  /**
   *  will navigate to products of the selected shop and will pass the id by url
   * @param id the id of product
   */

  onNavigate(id: number) {
    if (this.idMarket) {
      this.router.navigateByUrl(this.router.url + '/products');
    } else {
      this.router.navigateByUrl(this.router.url + '/' + id + '/products');
    }
  }
}
