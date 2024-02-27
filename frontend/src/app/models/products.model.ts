import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';

export interface Product {
  _id: string;
  title: string;
  description: string;
  image: { url: string; publicId: string | null };
  price: number;
  genre: [];
  count: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateProductRequestInterface {
  title: string;
  description: string;
  image: File;
  price: string;
  genre: string;
  count: string;
}

export interface ProductsResponseInterface {
  status: string;
  data: {
    products: Product[];
  };
}

export interface ProductResponseInterface {
  status: string;
  data: {
    product: Product;
  };
}
export interface ProductsStateModel extends EntityState<Product[]> {
  productsList: Product[];
  error: boolean | HttpErrorResponse;
  isLooding: boolean;
  productDetails: Product | null;
}
