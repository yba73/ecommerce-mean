import { ResponseInfo } from './../../models/common.model';
import {
  UserResponseInterface,
  LoginUserRequestInterface,
  RegisterRequestInterface,
  LoginResponseInterface,
  RegisterResponseInterface,
} from './../../models/user.model';
import { User } from '../../models/user.model';
import { createAction, props } from '@ngrx/store';

export const REGISTER_PEN = '[users]/registerUserPending';
export const REGISTER_FEL = '[users]/registerUserFellfield';

export const LOGIN_PEN = '[users]/loginUserPending';
export const LOGIN_FEL = '[users]/loginUserFellfield';

export const GET_USERS_PEN = '[user]/getUsersPending';

export const GET_USERS_FEL = '[user]/getUsersFellfield';

export const GET_USER_PEN = '[users]/getUserPending';

export const GET_USER_FEL = '[users]/getUserFellfield';

export const ISERT_PHOTO_USER_PEN = '[user]/InsertPhotoUserPending';

export const ISERT_PHOTO_USER_FEL = '[user]/InsertPhotoUserFellfield';

export const LOG_OUT = '[users]/logout';
export const BEGIN_LOGIN = '[auth] begin login';
export const DUPLICATE_USER = '[user] duplicate user';
export const DUPLICATE_USER_SUCC = '[user] duplicate user succ';
export const FETCH_MENU = '[user] fetch menu';
export const FETCH_MENU_SUCC = '[user] fetch menu succ';

export const GET_USER_REJE = '[user] get usersRejected';

export const GET_ROLES = '[role] get roles';
export const GET_ROLE_SUCC = '[role] get role succ';
export const GET_USERBYCODE = '[user] get userbycode';
export const GET_USERBYCODE_SUCC = '[user] get userbycode succ';
export const UPDATE_ROLE = '[user] update role';

export const GET_POSTS = '[user] get posts';
export const GET_POSTS_SUCC = '[user] get posts succ';

// export const beginRegister=createAction(BEGIN_REGISTER,props<{userdata:Users}>())
// export const beginLogin=createAction(BEGIN_LOGIN,props<{usercred:Usercred}>())
// export const duplicateUser=createAction(DUPLICATE_USER,props<{username:string}>())
// export const duplicateUserSuccess=createAction(DUPLICATE_USER_SUCC,props<{isduplicate:boolean}>())
// export const fetchmenu=createAction(FETCH_MENU,props<{userrole:string}>())
// export const fetchmenusuccess=createAction(FETCH_MENU_SUCC,props<{menulist:Roleaccess[]}>())

export const registerUserPending = createAction(
  REGISTER_PEN,
  props<{ user: RegisterRequestInterface }>()
);
export const registerUsersFellfield = createAction(
  REGISTER_FEL,
  props<{ response: RegisterResponseInterface }>()
);

export const loginUserPending = createAction(
  LOGIN_PEN,
  props<{ user: LoginUserRequestInterface }>()
);
export const loginUsersFellfield = createAction(
  LOGIN_FEL,
  props<{ response: LoginResponseInterface }>()
);

export const getUsersPending = createAction(GET_USERS_PEN);

export const getUsersFellfield = createAction(
  GET_USERS_FEL,
  props<{ response: UserResponseInterface[] }>()
);

export const getUserPending = createAction(
  GET_USER_PEN,
  props<{ id: string }>()
);

export const getUserFellfield = createAction(
  GET_USER_FEL,
  props<{ response: UserResponseInterface }>()
);

export const InsertPhotoUserPending = createAction(
  ISERT_PHOTO_USER_PEN,
  props<{ id: string; image: File }>()
);

export const InsertPhotoUserFellfield = createAction(
  ISERT_PHOTO_USER_FEL,
  props<{ response: ResponseInfo }>()
);
export const logoutAction = createAction(LOG_OUT);

// export const getUsersRejected = createAction(
//   GET_USER_REJE,
//   props<{ error: HttpErrorResponse }>()
// );
// export const getroles=createAction(GET_ROLES)
// export const getrolesuccess=createAction(GET_ROLE_SUCC,props<{rolelist:Roles[]}>())
// export const getuserbycode=createAction(GET_USERBYCODE,props<{username:string}>())
// export const getuserbycodesuccess=createAction(GET_USERBYCODE_SUCC,props<{userinfo:Userinfo}>())
// export const updateuserrole=createAction(UPDATE_ROLE,props<{userrole:string,userid:number}>())
