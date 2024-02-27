import { Product, ProductsStateModel } from './../../models/products.model';

import { createEntityAdapter } from '@ngrx/entity';

export const ProductsAdapter = createEntityAdapter<Product[]>();

export const ProductsState: ProductsStateModel =
  ProductsAdapter.getInitialState({
    productsList: [],
    error: false,
    productDetails: null,
    isLooding: false,
  });
