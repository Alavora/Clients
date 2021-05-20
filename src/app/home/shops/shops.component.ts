import { Shop } from './../../core/models/shop';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicDataService } from 'src/app/core/services/public-data.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent   {
  index: number = 10;
/** where we can save our list of shops */
public shops: Shop[] = [];
  /** inject our public service */
  constructor(private publicService : PublicDataService, private route: ActivatedRoute, private router: Router) {

  }
  /** when the app loads */
  ngOnInit():void {
    /** on init call this method */
    this.getShops();
  }
  /** method to get data from service [Public-data]*/
  getShops(): void{
    const idMarket = this.route.snapshot.paramMap.get('id') || '';
    if( idMarket ) {
      const id = Number(idMarket);
      this.publicService.getShopsByID(id).subscribe(data =>{
        this.shops = data;
      });
    }else{
      this.publicService.getShops().subscribe(data => {


        this.shops = data;

      });

     /*  this.publicService.getProducts().subscribe(data=>{
        console.log(data)
      }); */
    }

     /* this.publicService.getMarkets
      .subscribe(data => this.markets = data); */
  }
  onNavigate(id: number){
    //console.log(this.router.url)
    if(id){
      this.router.navigateByUrl(this.router.url +  '/products');

    }else{
      this.router.navigateByUrl('/products');
    }

    console.log(this.router.url);
  }
}
