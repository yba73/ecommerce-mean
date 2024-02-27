import { Order } from './../../models/orders.model';
import { showalert } from './../common/app.actions';

import { createReducer, on } from '@ngrx/store';

import { orderState } from './orders.state';
import {
  SendOrderPending,
  getOrderFellfield,
  getOrderending,
  SendOrderFellfield,
  getAllOrderPending,
  getAllOrderFellfield,
} from './orders.actions';

const _ordersReducer = createReducer(
  orderState,
  /*====== GET Cart user =======*/
  on(getOrderending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(getOrderFellfield, (state, action) => {
    return {
      ...state,
      isLooding: false,
      error: false,
      orders: action.response.data.orders,
    };
  }),
  /*======// GET Cart user //=======*/

  /*====== GET Cart user =======*/
  on(getAllOrderPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(getAllOrderFellfield, (state, action) => {
    return {
      ...state,
      isLooding: false,
      error: false,
      allOrders: action.response.data.allOrders,
    };
  }),
  /*======// GET Cart user //=======*/

  on(showalert, (state, action) => {
    return {
      ...state,
      error: action.error.error.message
        ? action.error.error.message
        : action.error.error,
    };
  })
);

export function ordersReducer(state: any, action: any) {
  return _ordersReducer(state, action);
}
