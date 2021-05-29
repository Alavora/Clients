import { MatDialogModule } from '@angular/material/dialog';
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

import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './login/register/register.component';
import { SidBarComponent } from './shared/sid-bar/sid-bar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { OkdialogComponent } from './shared/dialogs/okdialog/okdialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BottomNavModule } from 'ngx-bottom-nav';
import { LOCALE_ID } from '@angular/core';
import { commentDialog } from './shared/dialogs/comment-dialog/comment-dialog.component';
import { IntercepterService } from './core/services/intercepter.service';
import { AddproductComponent } from './shared/dialogs/addproduct/addproduct.component';
import { UserComponent } from './user/user.component';

registerLocaleData(localeDe);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SidBarComponent,
    OkdialogComponent,
    commentDialog,
    AddproductComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatListModule,
    HomeModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    BottomNavModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [OkdialogComponent],
})
export class AppModule {}
