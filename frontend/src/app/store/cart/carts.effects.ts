import { ToastrService } from 'ngx-toastr';
import { CartsService } from './../../services/cart/carts.service';
import { Router } from '@angular/router';
import {
  getCartPending,
  getCartFellfield,
  addProductCartPending,
  addProductCartFellfield,
  changeProductQuantityCartPending,
  changeProductQuantityCartFellfield,
  deleteProductCartPending,
  deleteProductCartFellfield,
  deleteAllProductCartPending,
} from './carts.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { showalert } from './../common/app.actions';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

// import { showalert } from "../Common/App.Action";
@Injectable()
export class CartsEffect {
  service: CartsService = inject(CartsService);
  action$: Actions = inject(Actions);
  router: Router = inject(Router);
  store: Store = inject(Store);
  userId: string;

  toast: ToastrService = inject(ToastrService);
  /*====== Get  Cart user =======*/

  _getcart = createEffect(() =>
    this.action$.pipe(
      ofType(getCartPending),
      exhaustMap((action) => {
        return this.service.getCart(action.id).pipe(
          map((response: any) => {
            return getCartFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'get  cart user rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// Get  cart //=======*/

  /*====== add product in cart =======*/
  _addproductincart = createEffect(() =>
    this.action$.pipe(
      ofType(addProductCartPending),
      exhaustMap((action) => {
        return this.service.addProductInCart(action.id).pipe(
          map((response: any) => {
            this.toast.success('product add success');

            return addProductCartFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) => {
            this.toast.error(
              ` ${_error.error.message ? _error.error.message : _error.message}`
            );

            return of(
              showalert({
                error: _error,
                message: 'add poroduct in rejected',
              })
            );
          })
        );
      })
    )
  );
  /*======//add product in cart  //=======*/

  /*====== change qquantity product in cart =======*/
  _changeproductquncart = createEffect(() =>
    this.action$.pipe(
      ofType(changeProductQuantityCartPending),
      exhaustMap((action) => {
        return this.service
          .changePorductQunCart({ id: action.id, payload: action.payload })
          .pipe(
            map((response: any) => {
              this.store.subscribe((state: any) => {
                this.userId = state.users.id;
              });
              this.store.dispatch(getCartPending({ id: this.userId }));
              return changeProductQuantityCartFellfield({ response });
            }),
            catchError((_error: HttpErrorResponse) =>
              of(
                showalert({
                  error: _error,
                  message: 'change product quantity in cart rejected',
                })
              )
            )
          );
      })
    )
  );
  /*======// change qquantity product in cart  //=======*/

  /*====== delete product from cart =======*/
  _deleteproductincart = createEffect(() =>
    this.action$.pipe(
      ofType(deleteProductCartPending),
      exhaustMap((action) => {
        return this.service.deleteProductInCart(action.id).pipe(
          map((response: any) => {
            this.store.subscribe((state: any) => {
              this.userId = state.users.id;
            });
            this.store.dispatch(getCartPending({ id: this.userId }));
            this.toast.success('product has been deleted successfully');

            return deleteProductCartFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'delete product from cart rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======//delete product from cart  //=======*/

  /*====== delete product from cart =======*/
  _deleteallproductincart = createEffect(() =>
    this.action$.pipe(
      ofType(deleteAllProductCartPending),
      exhaustMap((action) => {
        return this.service.deleteAllProductInCart(action.id).pipe(
          map((response: any) => {
            this.store.subscribe((state: any) => {
              this.userId = state.users.id;
            });
            this.store.dispatch(getCartPending({ id: this.userId }));

            this.toast.success('all products has been deleted successfully');
            return deleteProductCartFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'delete all product from cart rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======//delete all product from cart  //=======*/
}
