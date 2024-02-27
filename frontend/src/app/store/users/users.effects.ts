import { ToastrService } from 'ngx-toastr';
import {
  LoginUserRequestInterface,
  RegisterRequestInterface,
} from './../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { showalert } from './../common/app.actions';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from 'src/app/services/users/users.service';
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import {
  getUsersPending,
  getUsersFellfield,
  registerUserPending,
  registerUsersFellfield,
  loginUserPending,
  loginUsersFellfield,
  getUserPending,
  getUserFellfield,
  InsertPhotoUserPending,
  InsertPhotoUserFellfield,
} from './users.action';
import { Store } from '@ngrx/store';

// import { showalert } from "../Common/App.Action";
@Injectable()
export class UserEffect {
  service: UsersService = inject(UsersService);
  action$: Actions = inject(Actions);
  router: Router = inject(Router);
  store: Store = inject(Store);

  toast: ToastrService = inject(ToastrService);

  /*====== Get All Users =======*/

  _getallusers = createEffect(() =>
    this.action$.pipe(
      ofType(getUsersPending),
      exhaustMap((action) => {
        return this.service.getAllUsers().pipe(
          map((response: any) => {
            return getUsersFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) => {
            return of(
              showalert({
                error: _error,
                message: 'get all users rejected',
              })
            );
          })
        );
      })
    )
  );
  /*======// Get All Users //=======*/

  /*====== Get User =======*/
  _getuser = createEffect(() =>
    this.action$.pipe(
      ofType(getUserPending),
      exhaustMap((action) => {
        return this.service.getUser(action.id).pipe(
          map((response: any) => {
            return getUserFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'get user rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// Get User  //=======*/

  /*====== Register User =======*/
  _registeruser = createEffect(() =>
    this.action$.pipe(
      ofType(registerUserPending),
      exhaustMap((action: { type: string; user: RegisterRequestInterface }) => {
        return this.service.registerUser(action.user).pipe(
          map((response: any) => {
            this.router.navigate(['']);
            this.toast.success('register user success');

            return registerUsersFellfield({ response });
          }),
          catchError((_error: HttpErrorResponse) => {
            this.toast.error(
              `${_error.error.message ? _error.error.message : _error.message}`
            );

            return of(
              showalert({
                error: _error,
                message: 'register user rejected',
              })
            );
          })
        );
      })
    )
  );
  /*======// Register User //=======*/

  /*====== Login User =======*/
  _loginuser = createEffect(() =>
    this.action$.pipe(
      ofType(loginUserPending),
      exhaustMap(
        (action: { type: string; user: LoginUserRequestInterface }) => {
          return this.service.loginUser(action.user).pipe(
            map((response: any) => {
              this.router.navigate(['']);
              this.toast.success('user looged in successfully');

              return loginUsersFellfield({ response });
            }),
            catchError((_error: HttpErrorResponse) => {
              this.toast.error(
                `${
                  _error.error.message ? _error.error.message : _error.message
                }`
              );
              return of(
                showalert({
                  error: _error,
                  message: 'login user rejected',
                })
              );
            })
          );
        }
      )
    )
  );
  /*======// Login User //=======*/

  /*====== Login User =======*/
  _loginadmin = createEffect(() =>
    this.action$.pipe(
      ofType(loginUserPending),
      exhaustMap(
        (action: { type: string; user: LoginUserRequestInterface }) => {
          return this.service.loginAdmin(action.user).pipe(
            map((response: any) => {
              this.router.navigate(['/admin']);
              this.toast.success('admin looged in successfully');

              return loginUsersFellfield({ response });
            }),
            catchError((_error: HttpErrorResponse) => {
              this.toast.error(
                `${
                  _error.error.message ? _error.error.message : _error.message
                }`
              );
              return of(
                showalert({
                  error: _error,
                  message: 'login user rejected',
                })
              );
            })
          );
        }
      )
    )
  );
  /*======// Login User //=======*/

  /*====== insert  photo User =======*/
  _insertphotouser = createEffect(() =>
    this.action$.pipe(
      ofType(InsertPhotoUserPending),
      exhaustMap((action: { type: string; id: string; image: File }) => {
        return this.service.insertPhotoProfile(action).pipe(
          map((response: any) => {
            this.store.dispatch(getUserPending({ id: action.id }));
            this.toast.success('insert photo profile successfully');

            return InsertPhotoUserFellfield({ response });
          }),

          catchError((_error: HttpErrorResponse) =>
            of(
              showalert({
                error: _error,
                message: 'register user rejected',
              })
            )
          )
        );
      })
    )
  );
  /*======// insert  photo User //=======*/
}
