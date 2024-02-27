import { showalert } from './../common/app.actions';

import { createReducer, on, Action, ActionReducerMap } from '@ngrx/store';
import { getCartFellfield, getCartPending } from './carts.actions';
import { cartsState } from './carts.state';

const _cartsReducer = createReducer(
  cartsState,
  /*====== GET Cart user =======*/
  on(getCartPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(getCartFellfield, (state, action) => {
    return {
      ...state,
      isLooding: false,
      error: false,
      cart: action.response.data.cart,
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

export function cartsReducer(state: any, action: any) {
  return _cartsReducer(state, action);
}
