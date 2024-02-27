import { Order } from 'src/app/models/orders.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';

export interface User {
  _id: string;
  email: string;
  username: string;
  image: {
    url: string;
    publicId: string | null;
  };
  role: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
}
export interface LoginResponseInterface {
  status: string;
  data: {
    token: string;
  };
}

export interface RegisterResponseInterface {
  status: string;
  data: {
    token: string;
  };
}
export interface UsersStateModel extends EntityState<User[]> {
  isAuth: boolean;
  isAdmin: boolean;
  id: string | null;
  token: string | null;
  usersList: User[];
  userInfo?: User | null;
  error?: boolean | HttpErrorResponse;
  isLooding: boolean;
}
export interface RegisterRequestInterface {
  email: string;
  username: string;
  password: string;
}

export interface UserResponseInterface {
  status: string;
  data: {
    user: User;
  };
}

export interface UsersResponseInterface {
  status: string;
  data: {
    users: User[];
  };
}

export interface LoginUserRequestInterface {
  email: string;

  password: string;
}
