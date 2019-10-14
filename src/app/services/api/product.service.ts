import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private cartSubject = new BehaviorSubject({});
  private productSubject = new BehaviorSubject({});

  Products = [];
  cart = [];


  CartState = this.cartSubject.asObservable();
  productState = this.productSubject.asObservable();


  create(detail) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', 'multipart/form-data');
    const params = new HttpParams();
    return this.http.post('http://3.17.148.164/item/create', detail, { params, headers }).subscribe((res:any) => {
        console.log(res);
        this.Products.push(res.product)
        console.log(this.Products);
        
        this.productSubject.next(this.Products);
    });
  }

  getProducts() {
    return this.http.get('http://3.17.148.164/item/products').subscribe((res:any) => {
      console.log(res);
      this.Products = res.product;
      console.log(this.Products);
      
      this.productSubject.next(this.Products);
      
    });
    // return this.http.get('assets\\item.json');
  }
  deleteProduct(product){
    return this.http.post('http://3.17.148.164/item/delete', product  )
    .subscribe((res: any)  => {
      console.log(res);
      
      this.getProducts();

    });

  }
  editProduct(product){
    return this.http.post('http://3.17.148.164/item/update', product)
    .subscribe((res: any)  => {
      console.log(res);
      this.getProducts();
    });
  }
  
  addProduct(_product: any , value?: any ) {
    const flag = this.check(_product);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(flag);
    
    if (flag) {
          if (value == undefined) {value = 1; }
          return this.http.post('http://3.17.148.164/cart/update', {_product , user  , value})
          .subscribe((res: any)  => {
            this.cart = res.cart.cartDetails ;
            this.cartSubject.next(this.cart);
          });
        } else {
          return this.http.post('http://3.17.148.164/cart/add', {_product , user})
          .subscribe((res: any)  => {
            this.cart = res.cart.cartDetails ;
            this.cartSubject.next(this.cart);
          });
        }
  }
  check(_product) {
    let flag = false;
    console.log(this.cart,this.cart.length);
    
    if (this.cart.length >= 1 ) {
    for (const i in this.cart) {
      console.log(this.cart[i].item_id , _product.item_id);

          if (this.cart[i].item_id == _product.item_id) {
            
            return flag = true;
          }
        }
      }
    return flag;
  }
  allCartList() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.post('http://3.17.148.164/cart/cart', user).subscribe((res: any) => {
      if (res.product.length < 1 ) {
     } else {
      this.cart = res.product[0].cartDetails;
      this.cartSubject.next(this.cart);
     }
    });
  }
  getCardDetails() {
    return this.cart;
  }
  deleteCardDetails(product) {
    const id = product.item_id;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post('http://3.17.148.164/cart/delete', { id , user })
    .subscribe((res: any)  => {
      this.cart = res.cart.cartDetails ;
      this.cartSubject.next(this.cart);
    });
  }

  getUpdatedCart(){
    return this.CartState ;

  }
}
