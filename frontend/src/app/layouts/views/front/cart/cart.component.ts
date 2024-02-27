import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Cart } from 'src/app/models/carts.model';
import {
  changeProductQuantityCartPending,
  deleteAllProductCartPending,
  deleteProductCartPending,
  getCartPending,
} from 'src/app/store/cart/carts.actions';
import { getUserId } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart[];
  store: Store = inject(Store);
  isLooding: boolean = true;

  userId: string;
  /*===== changeQuantity =====*/
  changeQuantity = (data: { id: string; payload: number }) => {
    const { id, payload } = data;
    this.store.dispatch(changeProductQuantityCartPending({ id, payload }));

    // setTimeout(() => {
    //   this.store.subscribe((storeState: any) => {
    //     this.isLooding = storeState.carts.isLooding;
    //   });
    //   this.store.dispatch(getCartPending({ id: this.userId }));
    // }, 1000);
  };
  /*=====// changeQuantity //=====*/

  /*===== deleteProductFromCart =====*/
  deleteProductFromCart = (id: string) => {
    this.store.dispatch(deleteProductCartPending({ id }));

    // setTimeout(() => {
    //   this.store.dispatch(getCartPending({ id: this.userId }));
    // }, 1000);
  };
  /*=====// deleteProductFromCart //=====*/

  /*===== deleteProductFromCart =====*/
  deleteAllProductFromCart = (id: string) => {
    this.store.dispatch(deleteAllProductCartPending({ id }));

    // setTimeout(() => {
    //   this.store.dispatch(getCartPending({ id: this.userId }));
    // }, 1000);
  };
  /*=====// deleteProductFromCart //=====*/

  ngOnInit(): void {
    this.store.select(getUserId).subscribe((userId) => {
      userId ? (this.userId = userId) : null;
    });
    this.store.dispatch(getCartPending({ id: this.userId }));

    this.store.subscribe((state: any) => {
      this.cart = state.carts.cart;
      this.isLooding = state.carts.isLooding;
    });
  }
}
