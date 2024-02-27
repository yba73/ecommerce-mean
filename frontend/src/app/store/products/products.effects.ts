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
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
// import { showalert } from "../Common/App.Action";
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
            this.toast.success('proteced create successfully');

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
  /*======// create new Product //=======*/

  /*====== Login User =======*/
  // _loginuser = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(loginUserPending),
  //     exhaustMap((action: { type: string; user: LoginUser }) => {
  //       return this.service.loginUser(action.user).pipe(
  //         map((response) => {
  //           this.router.navigate(['']);
  //           return loginUsersFellfield({ response });
  //         }),
  //         catchError((_error: HttpErrorResponse) =>
  //           of(
  //             showalert({
  //               error: _error,
  //               message: 'register user rejected',
  //             })
  //           )
  //         )
  //       );
  //     })
  //   )
  // );
  /*======// Login User //=======*/

  // _getallposts = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(getposts),
  //     exhaustMap((action) => {
  //       return this.service.getAllPosts().pipe(
  //         map((data :any) => {
  //           return getpostssuccess({ posts: data });
  //         }),
  //         catchError((_error) =>
  //           of(
  //             showalert({
  //               message: `Failed to fetch posts list `,
  //               resulttype: 'fail',
  //               error: _error,
  //             })
  //           )
  //         )
  //       );
  //     })
  //   )
  // );
}
