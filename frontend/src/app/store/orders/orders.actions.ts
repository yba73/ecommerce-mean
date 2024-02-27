import { createAction, props } from '@ngrx/store';
import { ResponseInfo } from 'src/app/models/common.model';
import {
  AllOrdersResponseInterface,
  OrderUserResponseInterface,
  SendOrderResponseInterface,
} from 'src/app/models/orders.model';
export const GET_ORDER_PEN = '[orders]/getOrderPending';

export const GET_ORDER_FEL = '[orders]/getOrderFellfield';

export const GET_ALL_ORDER_PEN = '[orders]/getAllOrderPending';

export const GET_ALL_ORDER_ALL_FEL = '[orders]/getAllOrderFellfield';
export const SEND_ORDER_PEN = '[orders]/SendOrderPending';

export const SEND_ORDER_FEL = '[orders]/SendOrderFellfield';

export const DELETE_ORDER_PEN = '[orders]/DeleteOrderPending';

export const DELETE_ORDER_FEL = '[orders]/DeleteOrderFellfield';

export const deleteOrderPending = createAction(
  DELETE_ORDER_PEN,
  props<{ id: string }>()
);

export const deleteOrderFellfield = createAction(
  DELETE_ORDER_FEL,
  props<{ response: ResponseInfo }>()
);

export const getOrderending = createAction(
  GET_ORDER_PEN,
  props<{ id: string }>()
);

export const getOrderFellfield = createAction(
  GET_ORDER_FEL,
  props<{ response: OrderUserResponseInterface }>()
);

export const SendOrderPending = createAction(
  SEND_ORDER_PEN,
  props<SendOrderResponseInterface>()
);

export const SendOrderFellfield = createAction(
  SEND_ORDER_FEL,
  props<{ response: ResponseInfo }>()
);

export const getAllOrderPending = createAction(GET_ALL_ORDER_PEN);

export const getAllOrderFellfield = createAction(
  GET_ALL_ORDER_ALL_FEL,
  props<{ response: AllOrdersResponseInterface }>()
);
