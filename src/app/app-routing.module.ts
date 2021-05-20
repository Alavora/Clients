import { ShopsComponent } from './home/shops/shops.component';
import { BasketsComponent } from './home/baskets/baskets.component';
import { MarketsComponent } from './home/markets/markets.component';
import { RegisterComponent } from './login/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { UserGuard } from './guards/user.guard';
import { UserLoggedGuard } from './guards/user-logged.guard';
import { ProductsComponent } from './home/products/products.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [UserGuard]},
  {path: 'markets', component: MarketsComponent, canActivate: [UserGuard]},
  {path: 'baskets', component: BasketsComponent, canActivate: [UserGuard]},
  {path: 'markets/shop/:id', component: ShopsComponent, canActivate: [UserGuard]},
  {path: 'shops', component: ShopsComponent, canActivate: [UserGuard]},
  {path: 'markets/shop/:id/products', component: ProductsComponent, canActivate: [UserGuard]},
  {path: 'shops/:id/products', component: ProductsComponent, canActivate: [UserGuard]},
  { path: 'login', component: LoginComponent, canActivate: [UserLoggedGuard]},
  { path: 'register',component: RegisterComponent, canActivate: [UserLoggedGuard]  },
  { path: 'reset', component: ResetPasswordComponent ,  canActivate: [UserLoggedGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserGuard]
})
export class AppRoutingModule { }
