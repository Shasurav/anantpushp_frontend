import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from '../app/order/order.component';

import { AuthGuard } from './gaurd/auth.gaurd'

const routes: Routes = [
  { path : 'login', component : LoginComponent},
  { path : '', component : DashboardComponent 
  // , canActivate: [AuthGuard]
  , children : [{
    path : 'order', component : OrderComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
