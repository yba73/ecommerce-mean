import { SHOW_ALERT, showalert } from './../common/app.actions';

import jwt_decode from 'jwt-decode';
import { createReducer, on, Action } from '@ngrx/store';
import { UserAdapter, UserState } from './users.state';
import {
  InsertPhotoUserFellfield,
  InsertPhotoUserPending,
  getUserFellfield,
  getUserPending,
  getUsersFellfield,
  getUsersPending,
  loginUserPending,
  loginUsersFellfield,
  logoutAction,
  registerUserPending,
  registerUsersFellfield,
} from './users.action';

const _userReducer = createReducer(
  UserState,
  /*====== GET ALL USERS =======*/
  on(getUsersPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(getUsersFellfield, (state, action: any) => {
    return {
      ...state,
      isLooding: false,
      error: false,

      usersList: action.response.data.users,
    };
  }),
  /*======// GET ALL USERS //=======*/

  /*====== GET USER =======*/
  on(getUserPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(getUserFellfield, (state, action) => {
    return {
      ...state,
      isLooding: false,
      error: false,

      userInfo: action.response.data.user,
    };
  }),
  /*======// GET USER //=======*/

  /*====== GET USER =======*/
  on(InsertPhotoUserPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),
  on(InsertPhotoUserFellfield, (state, action) => {
    return {
      ...state,
      isLooding: false,
      error: false,
    };
  }),
  /*======// GET USER //=======*/

  /*====== Register User =======*/
  on(registerUserPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),

  on(registerUsersFellfield, (state, action) => {
    const token = action.response.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('isAuth', 'true');

    let isAdmin: boolean = false;
    let isAuth: boolean = true;

    const decoded: { role: string; sub: string } = jwt_decode(token);
    const id: string = decoded.sub;
    localStorage.setItem('id', id);
    if (decoded.role === 'admin') {
      isAdmin = true;
      localStorage.setItem('isAdmin', 'true');
    }

    return {
      ...state,
      id,
      token,
      isAdmin,
      isAuth,
      isLooding: false,
      error: false,
    };
  }),

  /*======// Register User //=======*/

  /*====== Login User =======*/
  on(loginUserPending, (state) => {
    return {
      ...state,
      isLooding: true,
      error: false,
    };
  }),

  on(loginUsersFellfield, (state, action) => {
    console.log('action login', action);
    const token = action.response.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('isAuth', 'true');

    let isAdmin: boolean = false;
    let isAuth: boolean = true;

    const decoded: { role: string; sub: string } = jwt_decode(token);
    const id: string = decoded.sub;
    localStorage.setItem('id', id);
    if (decoded.role === 'admin') {
      isAdmin = true;
      localStorage.setItem('isAdmin', 'true');
    }

    return {
      ...state,
      id,
      token,
      isAdmin,
      isAuth,
      isLooding: false,
      error: false,
    };
  }),

  /*======// Login User //=======*/

  /*====== logout User =======*/
  on(logoutAction, (state) => {
    localStorage.clear();
    return {
      ...state,
      isAuth: false,
      isAdmin: false,
      token: null,
      id: null,
    };
  }),
  /*======// logout User //=======*/

  on(showalert, (state, action) => {
    console.log('action', action);

    return {
      ...state,
      error: action.error.error.message,
    };
  })
);

export function UserReducer(state: any, action: any) {
  return _userReducer(state, action);
}
