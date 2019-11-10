import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
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
import { SearchitemPipe } from './filter/searchitem.pipe';
import { DeleteDialogComponent } from './items/delete-dialog/delete-dialog.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { CartComponent } from './items/cart/cart.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { LoaderInterceptor } from './services/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { AddressComponent } from './userinfo/address/address.component';
import { BankdetailsComponent } from './userinfo/bankdetails/bankdetails.component';
import { InvoiceComponent } from './userinfo/invoice/invoice.component';
import { CommonModule } from '@angular/common';


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
    AddItemComponent,
    SearchitemPipe,
    DeleteDialogComponent,
    NavbarComponent,
    CartComponent,
    EditItemComponent,
    AddressComponent,
    BankdetailsComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule
  ],
  entryComponents: [DeleteDialogComponent,EditItemComponent ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS,useClass: LoaderInterceptor,multi: true},
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                ProductService,LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
