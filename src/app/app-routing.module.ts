import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from '../app/order/order.component';

import { AuthGuard } from './gaurd/auth.gaurd'
import { RegistrationComponent } from './registration/registration.component';
import { ItemsVisualComponent } from './items/items-visual/items-visual.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { CartComponent } from './items/cart/cart.component';
import { AddressComponent } from './userinfo/address/address.component';
import { BankdetailsComponent } from './userinfo/bankdetails/bankdetails.component';
import { InfoComponent } from './userinfo/info/info.component';

const routes: Routes = [
  { path : 'login', component : LoginComponent},
  { path : 'registration', component : RegistrationComponent},
  { path : '', component : DashboardComponent 
  , canActivate: [AuthGuard]
  , children : [
    {path : 'order', component : OrderComponent},
    {path : '', component : ItemsVisualComponent},
    {path : 'cart', component : CartComponent},
    {path : 'address', component : AddressComponent},
    {path: 'info', component: InfoComponent},
    {path : 'bankdetails', component : BankdetailsComponent},
    {path : 'add', component: AddItemComponent}

    ] 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
