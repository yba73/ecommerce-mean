import { ResponseInfo } from 'src/app/models/common.model';
import {
  CreateProductRequestInterface,
  Product,
  ProductResponseInterface,
  ProductsResponseInterface,
} from './../../models/products.model';
import { HttpResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const GET_PRODCUTS_PEN = '[products]/GetProductsPending';
export const GET_PRODUCTS_FEL = '[products]/GetProductsFellfield';

export const GET_PRODCUT_PEN = '[products]/GetProductPending';

export const GET_PRODUCT_FEL = '[products]/GetProductFellfield';

export const CREATE_PRODCUT_PEN = '[products]/CreateProductPending';

export const CREATE_PRODUCT_FEL = '[products]/CreateProductFellfield';

export const getProductsPending = createAction(GET_PRODCUTS_PEN);

export const getProductsFelllfield = createAction(
  GET_PRODUCTS_FEL,
  props<{ response: ProductsResponseInterface }>()
);

export const getProductPending = createAction(
  GET_PRODCUT_PEN,
  props<{ id: string }>()
);

export const getProductFelllfield = createAction(
  GET_PRODUCT_FEL,
  props<{ response: ProductResponseInterface }>()
);

export const createProductPending = createAction(
  CREATE_PRODCUT_PEN,
  props<{ product: CreateProductRequestInterface }>()
);

export const createProductFelllfield = createAction(
  CREATE_PRODUCT_FEL,
  props<{ response: ResponseInfo }>()
);
