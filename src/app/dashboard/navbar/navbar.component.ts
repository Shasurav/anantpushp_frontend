import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router} from '@angular/router';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  products = [];
  cartCount: any = 0 ;
  private subscription: Subscription;
  

    constructor(
        private router: Router,
        public loaderService: LoaderService,
        private authenticationService: AuthenticationService,
        private productService: ProductService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.subscription = this
    .productService
    .CartState
    .subscribe((state: any)  => {
      this.cartCount = 0;
      for (const i in state) {
       this.cartCount +=  state[i].qty;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
 ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
