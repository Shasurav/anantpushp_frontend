import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';
import { Products } from 'src/app/model/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any[];
  cartCount;

  private subscription: Subscription;
  displayedColumns: string[];


  constructor( private productService: ProductService, private router:Router) {
    this.subscription = this
    .productService
    .CartState
    .subscribe((state: any)  => {
      for(let i in state) {
        if(state[i].qty < 1 ){
          this.productService.deleteCardDetails(state[i]);
        }
      }
      this.products = [];
      this.products = state;

    });
    this.getRefreshData();
  }

  ngOnInit() {
  }
  getRefreshData() {
    this.products = this.productService.getCardDetails();

    // this.cartCount = this.products.length;
    // this.products.forEach(product => {
    //   for (const key in product) {
    //            if (product.hasOwnProperty(key))
    //              console.log(product[key]);
    //          }
    // });
    this.displayedColumns = ['image', 'product', 'price', 'quantity', 'amount', 'delete'];
  }
    getTotalCost() {
      return this.products.map(t => t.price * t.qty).reduce((acc, value) => acc + value, 0);
    }
    navigate(){
      this.router.navigate(['/address']);
    }
  // this.products: Transaction[]
    // this.subscription = this
    // .productService
    // .CartState
    // .subscribe((state:any)  => {
    //     this.products = state.products;
    //     this.quantity++;
    //     this.products.forEach(product => {
    //      for (const key in product) {
    //        if (product.hasOwnProperty(key))
    //          console.log(product[key]);
    //      }
    //     });
    //     console.log(this.products);
    // });
    delete(id: String) {
      this.productService.deleteCardDetails(id);
      // this.products.splice(this.products.indexOf(i), 1)
      // this.getRefreshData;
      // console.log(this.products)
      // this.products.delete(product.id)

      // this.productService.deleteCardDetails(id);
      // this.products = this.products.filter(item => item.id !== id);
      // this.products.push();
  }
  decrement(product) {
      this.productService.addProduct(product , '-1');
  }
  increment(product) {
      this.productService.addProduct(product , '1');

    }
    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

  }

