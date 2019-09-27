import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';
import { Products } from 'src/app/model/products';
export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any[];
  quantity: number=0;
  private subscription : Subscription;
  transactions:Products;
  displayedColumns: string[];
  constructor( private productService : ProductService) { 
    console.log("e")
  }

  ngOnInit() {
    this.products = this.productService.getCardDetails();
    this.products.forEach(product => {
      for (const key in product) {
               if (product.hasOwnProperty(key))
                 console.log(product[key]);
             }  
    });
    this.displayedColumns = ['image','product', 'price','quantity','amount','delete'];
  }
    getTotalCost() {
      return this.products.map(t => t.price).reduce((acc, value) => acc + value, 0);
   
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

  }

}
