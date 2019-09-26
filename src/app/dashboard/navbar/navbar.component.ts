import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  products = [];
  cartCount ;


  private subscription : Subscription;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private productService : ProductService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.subscription = this
    .productService
    .CartState
    .subscribe((state:any)  => {
        this.products = state.products;
        this.cartCount = this.products.length;
        console.log(this.products);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
