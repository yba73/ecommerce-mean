import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/app/env/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  http: HttpClient = inject(HttpClient);
  base_url = environment.base_url;
  store: Store = inject(Store);

  token: string;
  headers: HttpHeaders;
  addProductInCart = (id: string) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.post(`${this.base_url}/carts/${id}`, id, {
      headers: this.headers,
    });
  };

  getCart = (id: string) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    // this.headers = new Headers().set('token', this.token);
    return this.http.get(`${this.base_url}/carts/${id}`, {
      headers: this.headers,
    });
  };
  constructor() {}

  changePorductQunCart = (data: { id: string; payload: number }) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.put(`${this.base_url}/carts/${data.id}`, data, {
      headers: this.headers,
    });
  };

  deleteProductInCart = (id: string) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.delete(`${this.base_url}/carts/product/${id}`, {
      headers: this.headers,
    });
  };

  deleteAllProductInCart = (id: string) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.delete(`${this.base_url}/carts/${id}`, {
      headers: this.headers,
    });
  };
}
