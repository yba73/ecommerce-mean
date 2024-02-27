import { ProductsService } from './../../services/products/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { showalert } from './../common/app.actions';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getProductsPending,
  getProductsFelllfield,
  getProductPending,
  getProductFelllfield,
  createProductPending,
} from './products.actions';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductsEffects {
  service: ProductsService = inject(ProductsService);
  action$: Actions = inject(Actions);
  router: Router = inject(Router);
  toast: ToastrService = inject(ToastrService);

  /*====== Get All Products =======*/
  _getallproducts = createEffect(() =>
    this.action$.pipe(
      ofType(getProductsPending),
      exhaustMap((action) => {
        return this.service.getAllProducts().pipe(
          map((response: any) => {
            return getProductsFelllfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'get all products rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// Get All Products //=======*/
  /*====== Get All Products =======*/
  _getproduct = createEffect(() =>
    this.action$.pipe(
      ofType(getProductPending),
      exhaustMap((action) => {
        return this.service.getProduct(action.id).pipe(
          map((response: any) => {
            return getProductFelllfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'get all products rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// Get All Products //=======*/
  /*====== create new Product =======*/
  _createproduct = createEffect(() =>
    this.action$.pipe(
      ofType(createProductPending),
      exhaustMap((action: any) => {
        return this.service.createProduct(action).pipe(
          map((response: any) => {
            return getProductFelllfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'create new product rejected',
              })
            )
          )
        );
      })
    )
  );
}
