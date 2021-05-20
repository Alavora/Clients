import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { RegisterComponent } from './login/register/register.component';
import { SidBarComponent } from './shared/sid-bar/sid-bar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { SidBarModule } from './sid-bar/sid-bar.module';
import { OkdialogComponent } from './dialogs/okdialog/okdialog.component';
import { HttpClientModule } from '@angular/common/http';
import { BottomNavModule } from 'ngx-bottom-nav';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localeDe);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent,
    SidBarComponent,
    OkdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    HomeModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LoginModule,
    MatGridListModule,
    MatMenuModule,
    SidBarModule,
    BottomNavModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' },],
  bootstrap: [AppComponent],
  entryComponents: [OkdialogComponent]
})
export class AppModule { }
