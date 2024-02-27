import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStateModel } from 'src/app/models/user.model';
import { UserAdapter } from './users.state';

const getUserState = createFeatureSelector<UsersStateModel>('users');

const userselector = UserAdapter.getSelectors();

export const getUsersList = createSelector(getUserState, (state) => {
  state.usersList;
  state.isLooding;
});

export const getUserId = createSelector(getUserState, (state) => state.id);
export const getUsersPosts = createSelector(
  getUserState,
  userselector.selectAll
);
