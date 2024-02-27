import { Store } from '@ngrx/store';
import {
  RegisterRequestInterface,
  LoginUserRequestInterface,
} from './../../models/user.model';
import { environment } from './../../env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  base_url: string = environment.base_url;
  token: string;
  store: Store = inject(Store);
  headers: HttpHeaders;
  http: HttpClient = inject(HttpClient);

  getAllUsers = () => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.get(`${this.base_url}/admin/users`, {
      headers: this.headers,
    });
  };

  getUser = (id: string) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    return this.http.get(`${this.base_url}/users/${id}`, {
      headers: this.headers,
    });
  };

  registerUser = (data: RegisterRequestInterface) => {
    return this.http.post(`${this.base_url}/users/register`, { ...data });
  };

  loginUser = (data: LoginUserRequestInterface) => {
    return this.http.post(`${this.base_url}/users/login`, { ...data });
  };
  loginAdmin = (data: LoginUserRequestInterface) => {
    return this.http.post(`${this.base_url}/admin/login`, { ...data });
  };

  insertPhotoProfile = (data: { id: string; image: File }) => {
    this.store.subscribe((state: any) => {
      this.token = state.users.token;
    });
    this.headers = new HttpHeaders().set('authorization', this.token);
    console.log('data insertimage', data);

    let form: FormData = new FormData();
    form.append('image', data.image);
    console.log('form', form);

    return this.http.put(`${this.base_url}/users/photo/${data.id}`, form, {
      headers: this.headers,
    });
  };

  constructor() {}
}
