import {
  CreateProductRequestInterface,
  Product,
} from './../../models/products.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../env/environment';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  base_url: string = environment.base_url;
  http: HttpClient = inject(HttpClient);
  store: Store = inject(Store);

  token: string
  headers: HttpHeaders
  getAllProducts = () => {
    return this.http.get(`${this.base_url}/products/all`);
  };

  getProduct = (id: string) => {
    return this.http.get(`${this.base_url}/products/${id}`);
  };

  createProduct = (product: CreateProductRequestInterface) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    const form = new FormData();
    form.append('title', product.title);
    form.append('description', product.description);
    form.append('image', product.image);
    form.append('count', product.count);
    form.append('genre', product.genre);
    form.append('price', product.price);

    return this.http.post(`${this.base_url}/admin/products`, form, {
      headers: this.headers,
    });
  };
  constructor() {}
}
