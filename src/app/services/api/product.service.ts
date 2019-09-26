import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private cartSubject = new Subject();
  Products = [];

  
  CartState = this.cartSubject.asObservable();

  create(detail) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', 'multipart/form-data');
    const params = new HttpParams();
    return this.http.post('http://localhost:3000/item/create', detail, { params, headers });
  }

  getProducts() {
    // return this.http.get('http://localhost:3000/item/products');
    return this.http.get("assets\\item.json");
  }
  addProduct(_product:any) {
    console.log(_product)
    this.Products.push(_product)
    this.cartSubject.next({products:  this.Products});
  }
}
