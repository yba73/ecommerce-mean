import { ToastrService } from 'ngx-toastr';
import { getCartPending } from './../cart/carts.actions';
import { OrdersService } from './../../services/orders/orders.service';
import { CartsService } from './../../services/cart/carts.service';
import { Router } from '@angular/router';
import {
  deleteOrderFellfield,
  deleteOrderPending,
  getAllOrderFellfield,
  getAllOrderPending,
  getOrderending,
  getOrderFellfield,
  SendOrderFellfield,
  SendOrderPending,
} from './orders.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { showalert } from './../common/app.actions';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

// import { showalert } from "../Common/App.Action";
@Injectable()
export class OrdersEffect {
  service: OrdersService = inject(OrdersService);
  action$: Actions = inject(Actions);
  router: Router = inject(Router);
  store: Store = inject(Store);
  userId: string;
  toast: ToastrService = inject(ToastrService);

  /*====== Get  order user =======*/

  _getuserorder = createEffect(() =>
    this.action$.pipe(
      ofType(getOrderending),
      exhaustMap((action) => {
        return this.service.getOrder(action.id).pipe(
          map((response: any) => {
            return getOrderFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'get user order rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// Get order cart //=======*/

  /*====== Get  order user =======*/

  _getAllorders = createEffect(() =>
    this.action$.pipe(
      ofType(getAllOrderPending),
      exhaustMap((action: any) => {
        return this.service.getAllOrders().pipe(
          map((response: any) => {
            return getAllOrderFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'get all orders rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// Get order cart //=======*/
  /*====== send order user =======*/

  _senduserorder = createEffect(() =>
    this.action$.pipe(
      ofType(SendOrderPending),
      exhaustMap((action) => {
        return this.service.sendOrder(action).pipe(
          map((response: any) => {
            this.store.subscribe((state: any) => {
              this.userId = state.users.id;
            });
            this.store.dispatch(getOrderending({ id: this.userId }));
            this.store.dispatch(getCartPending({ id: this.userId }));
            this.toast.success('order has ben send successfully');
            return SendOrderFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'send user order rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// send order  cart //=======*/

  /*====== delete  order user =======*/

  _deletetuserorder = createEffect(() =>
    this.action$.pipe(
      ofType(deleteOrderPending),
      exhaustMap((action) => {
        return this.service.deleteUserOrder(action.id).pipe(
          map((response: any) => {
            this.store.dispatch(getAllOrderPending());
            this.toast.success('order has ben send successfully');
            return deleteOrderFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'get user order rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// delete order cart //=======*/
}
