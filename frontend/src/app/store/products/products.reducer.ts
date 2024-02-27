import {
  getProductsPending,
  getProductsFelllfield,
  getProductPending,
  getProductFelllfield,
} from './products.actions';
import { showalert } from './../common/app.actions';

import { createReducer, on, Action, ActionReducerMap } from '@ngrx/store';
import { ProductsState } from './products.state';

const _productsReducer = createReducer(
  ProductsState,
  /*====== GET All Products =======*/
  on(getProductsPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(getProductsFelllfield, (state, action) => {
    return {
      ...state,
      isLooding: false,
      error: false,
      productsList: action.response.data.products,
    };
  }),
  /*======// GET ALL Products //=======*/
  /*====== GET Product =======*/
  on(getProductPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(getProductFelllfield, (state, action) => {
    return {
      ...state,
      isLooding: false,
      error: false,
      productDetails: action.response.data.product,
    };
  }),
  /*======// GET  Product //=======*/
  on(showalert, (state, action) => {
    return {
      ...state,
      error: action.error.error.message,
    };
  })
);

export function productReducer(state: any, action: any) {
  return _productsReducer(state, action);
}
