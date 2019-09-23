import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './dashboard/side-nav/sidenav.component';


import { ErrorInterceptor} from './gaurd/error.interceptor';
import { JwtInterceptor } from './gaurd/jwt.interceptor';
// import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { OrderComponent } from './order/order.component';
import { RegistrationComponent } from './registration/registration.component';
import { ItemsVisualComponent } from './items/items-visual/items-visual.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import {ProductService} from './services/api/product.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    // UserProfileComponent,
    OrderComponent,
    RegistrationComponent,
    ItemsVisualComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
