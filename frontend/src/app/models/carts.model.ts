import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './products.model';
export interface CartsStatInterface {
  cart: Cart[];
  error: boolean | HttpErrorResponse;
  isLooding: boolean;
}
export interface CartResponseInterface {
  status: string;
  data: {
    cart: Cart[];
  };
}
export interface Cart {
  _id: string;
  owner: {
    _id: string;
    username: string;
    image: string;
    id: string;
  };
  product: Product;
  quantity: number;
  price: number;
  title?: string;
  image?: {
    url: string;
  };

  status: {
    type: string;
    enum: ['pending', 'success']; // enum: role adimn or customer else error
    default: 'pending';
  };

  total: number;
  createdAt: Date;
  updatedAt: Date;
}
