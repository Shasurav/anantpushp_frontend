import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products = [];
  private subscription : Subscription;
  
  constructor( private productService : ProductService) { }

  ngOnInit() {
    this.subscription = this
    .productService
    .CartState
    .subscribe((state:any)  => {
        this.products = state.products;
        console.log(this.products);
    });
  }

}
