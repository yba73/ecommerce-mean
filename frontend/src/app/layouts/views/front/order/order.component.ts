import { FormGroup, FormControl } from '@angular/forms';
import { Cart } from 'src/app/models/carts.model';
import { Order } from 'src/app/models/orders.model';
import {
  deleteProductCartPending,
  getCartPending,
} from './../../../../store/cart/carts.actions';
import {
  getOrderending,
  SendOrderPending,
} from './../../../../store/orders/orders.actions';

import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendOrderSchema } from 'src/app/utils/validations/orders.schema';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css', '../../../../../styles.css'],
})
export class OrderComponent implements OnInit {
  store: Store = inject(Store);
  isLoodingOrders: boolean = true;
  isLoodingCart: boolean = true;
  userId: string;
  orders: Order[] = [];
  carts: Cart[] = [];
  totalamount: number;
  total: number;
  oldCarts: Cart[] = [];
  toogleOldOrder: boolean = false;

  orderForm: FormGroup;
  livraison: FormControl;
  address: FormControl;
  phone: FormControl;

  errors: {
    address?: string;
    phone?: string;
    livraison?: string;
    invalid: boolean;
  } = {
    invalid: true,
  };
  initialization = () => {
    this.livraison = new FormControl('');
    this.address = new FormControl('');
    this.phone = new FormControl('');
  };
  createForm = () => {
    this.orderForm = new FormGroup({
      livraison: this.livraison,
      address: this.address,
      phone: this.phone,
    });
  };
  /*======== deleteProductFromCart ======*/
  deleteProductFromCart = (id: string) => {
    this.store.dispatch(deleteProductCartPending({ id }));
    // setTimeout(() => {
    //   this.store.dispatch(getCartPending({ id: this.userId }));
    // }, 2000);
  };
  /*========// deleteProductFromCart //======*/

  /*======== toogleOldOrders ======*/
  toogleOldOrders = () => {
    this.toogleOldOrder = !this.toogleOldOrder;
  };
  /*========// toogleOldOrders //======*/

  /*======== getLivraison ======*/
  getLivraison = () => {
    console.log('value', this.orderForm.value);
    if (this.orderForm.value.livraison) {
      this.total = this.totalamount + 30;
    } else {
      this.total = this.totalamount;
    }
  };
  /*========// getLivraison //======*/

  /*======== sendOrder ======*/
  sendOrder = () => {
    const { address, phone, livraison } = this.orderForm.value;
    this.store.dispatch(
      SendOrderPending({
        id: this.userId,
        address,
        phone,
        livraison: Boolean(livraison),
      })
    );
    // setTimeout(() => {
    //   this.store.dispatch(getOrderending({ id: this.userId }));
    //   this.store.dispatch(getCartPending({ id: this.userId }));
    // }, 2000);
  };
  /*========// sendOrder //======*/

  /*======== showErros =====*/
  showErros = () => {
    this.errors = {
      address: '',
      phone: '',
      livraison: '',

      invalid: true,
    };
    this.orderForm.value.livraison === ''
      ? (this.orderForm.value.livraison = false)
      : this.orderForm.value.livraison;
    sendOrderSchema
      .validate(this.orderForm.value, { abortEarly: false })
      .then((result: any) => {
        this.errors.invalid = false;
      })
      .catch((errorsLop) => {
        this.errors.invalid = true;
        errorsLop.inner.forEach((error: any) => {
          if (error.path === 'address') {
            this.errors.address = error.message;
          } else if (error.path === 'phone') {
            this.errors.phone = error.message;
          } else if (error.path === 'livraison') {
            this.errors.livraison = error.message;
          }
        });
      });
  };
  /*====// showErros //=====*/

  constructor() {
    this.initialization();
    this.createForm();
  }
  ngOnInit() {
    console.log('order page');

    this.store.subscribe((state: any) => {
      this.userId = state.users.id;
      this.isLoodingOrders = state.orders.isLooding;
      this.isLoodingCart = state.carts.isLooding;

      this.orders = state.orders.orders;
      this.carts = state.carts.cart;

      this.totalamount = this.carts.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0
      );
      this.total = this.totalamount;
      const sliceCarts = state.orders.orders.map((items: any) => {
        return items.cart;
      });

      const cartsArray: Cart[] = [];
      for (let byCart of sliceCarts) {
        for (let item of byCart) {
          cartsArray.push(item);
        }
      }
      this.oldCarts = cartsArray;
    });

    this.store.dispatch(getOrderending({ id: this.userId }));
    this.store.dispatch(getCartPending({ id: this.userId }));
  }
}
