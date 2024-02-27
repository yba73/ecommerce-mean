import { UsersStateModel } from './../models/user.model';
import { Action, ActionReducerMap } from '@ngrx/store';

import * as users from '../models/user.model';
import * as products from '../models/products.model';
import * as carts from '../models/carts.model';
import * as orders from '../models/orders.model';

import { UserReducer } from './users/users.reducers';
import { productReducer } from './products/products.reducer';
import { cartsReducer } from './cart/carts.reducers';
import { ordersReducer } from './orders/orders.reducer';
export interface Store {
  users: UsersStateModel;
  products: products.ProductsStateModel;
  carts: carts.CartsStatInterface;
  orders: orders.OrderStateInterface;
}
export interface AppState {
  users: users.UsersStateModel;
  products: products.ProductsStateModel;
  carts: carts.CartsStatInterface;
}

export const reducers: ActionReducerMap<Store> = {
  users: UserReducer,
  products: productReducer,
  carts: cartsReducer,
  orders: ordersReducer,
};
