import { ResponseInfo } from './../../models/common.model';
import { CartResponseInterface } from 'src/app/models/carts.model';

import { createAction, props } from '@ngrx/store';
export const GET_CART_PEN = '[carts]/getCartPending';

export const GET_CART_FEL = '[carts]/getCartFellfield';

export const ADD_PRODUCT_CART_PEN = '[carts]/AddProductCartPending';

export const ADD_PRODUCT_CART_FEL = '[carts]/AddProductCartFellfield';

export const CHANGE_PRODUCT_CART_QUN_PEN =
  '[carts]/ChangeProductQuantityCartPending';

export const CHANGE_PRODUCT_CART_QUN_FEL =
  '[carts]/ChangeProductQuantityCartFellfield';

export const DEL_PRODUCT_CART_PEN = '[carts]/DelProductCartPending';

export const DEL_PRODUCT_CART_FEL = '[carts]/DelProductCartFellfield';
export const getCartPending = createAction(
  GET_CART_PEN,
  props<{ id: string }>()
);

export const DEL_ALL_PRODUCT_CART_PEN = '[carts]/DelAllProductCartPending';
export const DEL_ALL_PRODUCT_CART_FEL = '[carts]/DelALLProductCartFellfield';

export const getCartFellfield = createAction(
  GET_CART_FEL,
  props<{ response: CartResponseInterface }>()
);

export const addProductCartPending = createAction(
  ADD_PRODUCT_CART_PEN,
  props<{ id: string }>()
);

export const addProductCartFellfield = createAction(
  ADD_PRODUCT_CART_FEL,
  props<{ response: ResponseInfo }>()
);

export const deleteProductCartPending = createAction(
  DEL_PRODUCT_CART_PEN,
  props<{ id: string }>()
);

export const deleteProductCartFellfield = createAction(
  DEL_PRODUCT_CART_FEL,
  props<{ response: ResponseInfo }>()
);

export const deleteAllProductCartPending = createAction(
  DEL_ALL_PRODUCT_CART_PEN,
  props<{ id: string }>()
);

export const deleteAllProductCartFellfield = createAction(
  DEL_ALL_PRODUCT_CART_FEL,
  props<{ response: ResponseInfo }>()
);

export const changeProductQuantityCartPending = createAction(
  CHANGE_PRODUCT_CART_QUN_PEN,
  props<{ id: string; payload: number }>()
);

export const changeProductQuantityCartFellfield = createAction(
  CHANGE_PRODUCT_CART_QUN_FEL,
  props<{ response: ResponseInfo }>()
);
