import { User, UsersStateModel } from './../../models/user.model';

import { createEntityAdapter } from '@ngrx/entity';

export const UserAdapter = createEntityAdapter<User[]>();

export const UserState: UsersStateModel = UserAdapter.getInitialState({
  isAuth: JSON.parse(localStorage.getItem('isAuth') || 'false'),
  isAdmin: JSON.parse(localStorage.getItem('isAdmin') || 'false'),
  token: localStorage.getItem('token') || null,
  id: localStorage.getItem('id') || null,
  usersList: [],
  isLooding: false,
  error: false,
  userInfo: null,
});
