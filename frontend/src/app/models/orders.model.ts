import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from './carts.model';
export interface Order {
  owner: {
    _id: string;
    username: string;
    email: string;
    id: string;
  };

  address: string;
  phone: number;
  totalamount: number;
  tatal: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
export interface AllOrders {
  _id: string;
  owner: {
    _id: string;
    username: string;
    email: string;
    id: string;
    image: {
      url: string;
      publicId?: string;
    };
  };

  address: string;
  phone: number;
  totalamount: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  cart: Cart[];
}

export interface AllOrdersResponseInterface {
  status: string;
  data: {
    allOrders: AllOrders[];
  };
}
export interface OrderUserResponseInterface {
  status: string;
  data: {
    orders: Order[];
    carts: Cart[];
  };
}

export interface SendOrderResponseInterface {
  id: string;
  phone: number;
  livraison: boolean;
  address: string;
}

export interface OrderStateInterface {
  isLooding: boolean;
  allOrders: AllOrders[];
  orders: Order[];
  error: HttpErrorResponse | boolean;
}
