import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/api/product.service';
import { Products } from 'src/app/model/products';
import { Address } from 'src/app/model/address';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  products:any;
  newProduct:Products;
  address: any;
  totalCost:any;
  selectedAddress:{};
  selectedBank:{};
  displayedColumns: string[] = ['name', 'price'];
  displayedDiscountColumns = ['discountTitle',  'discountAmount'];
  displayedGstColumns = ['gstTitle',  'gstAmount'];
  displayedTotalColumns = ['totalAmountTitle', 'totalAmount'];
  public constructor(private productservice:ProductService, private router:Router) {
  }
  getSubTotalCost() {
    return this.products.map(t => t.price * t.qty).reduce((acc, value) => acc + value, 0);
  }
  discount(){
    return 0.05 * this.getSubTotalCost();
  }
  getTotalCost(){
    return this.getSubTotalCost() - this.discount() + this.gst();
  }
  gst(){
    return 0.025 * this.getSubTotalCost();
  }
  ngOnInit(){
    this.productservice.CartState.subscribe((product) => {this.products= product;
    console.log(product)})
    this.selectedAddress = JSON.parse(localStorage.getItem('address'));
    this.selectedBank = JSON.parse(localStorage.getItem('bank'));
    }
    placeOrder(){
      this.router.navigate(['/order']);
    }
}
