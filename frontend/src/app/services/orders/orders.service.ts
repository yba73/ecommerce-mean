import { environment } from './../../env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SendOrderResponseInterface } from 'src/app/models/orders.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http: HttpClient = inject(HttpClient);
  store: Store = inject(Store);
  base_url: string = environment.base_url;
  token: string;
  headers: HttpHeaders;

  getOrder = (id: string) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.get(`${this.base_url}/orders/${id}`, {
      headers: this.headers,
    });
  };
  getAllOrders = () => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.get(`${this.base_url}/admin/orders`, {
      headers: this.headers,
    });
  };

  sendOrder = (data: SendOrderResponseInterface) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    const { phone, address, livraison } = data;
    return this.http.post(
      `${this.base_url}/orders/${data.id}`,
      { phone, address, livraison },
      {
        headers: this.headers,
      }
    );
  };

  deleteUserOrder = (id: string) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.delete(`${this.base_url}/admin/orders/users/${id}`, {
      headers: this.headers,
    });
  };
}
