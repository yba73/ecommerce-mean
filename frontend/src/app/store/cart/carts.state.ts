import { Cart, CartsStatInterface } from './../../models/carts.model';

import { createEntityAdapter } from '@ngrx/entity';

export const cartAdapter = createEntityAdapter<Cart[]>();

export const cartsState: CartsStatInterface = cartAdapter.getInitialState({
  cart: [],
  isLooding: false,
  error: false,
});
