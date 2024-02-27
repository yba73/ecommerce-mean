import { Order, OrderStateInterface } from './../../models/orders.model';

import { createEntityAdapter } from '@ngrx/entity';

export const orderAdapter = createEntityAdapter<Order[]>();

export const orderState: OrderStateInterface = orderAdapter.getInitialState({
  isLooding: false,
  orders: [],
  allOrders: [],
  error: false,
});
