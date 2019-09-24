import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

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
}
