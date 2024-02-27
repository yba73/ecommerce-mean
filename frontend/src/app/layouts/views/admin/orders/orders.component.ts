import { deleteProductCartPending } from 'src/app/store/cart/carts.actions';
import { AllOrders } from './../../../../models/orders.model';
import {
  deleteOrderPending,
  getAllOrderPending,
} from './../../../../store/orders/orders.actions';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  store: Store = inject(Store);
  allOrders: AllOrders[] = [];
  isLooding: boolean = true;
  ngOnInit() {
    this.store.dispatch(getAllOrderPending());
    this.store.subscribe((state: any) => {
      this.allOrders = state.orders.allOrders;
      this.isLooding = state.orders.isLooding;
      console.log('allOrders', this.allOrders);
    });
  }

  /*======== deleteProductFromCart ======*/
  deletOrder = (id: string) => {
    this.store.dispatch(deleteOrderPending({ id }));
    setTimeout(() => {
      this.store.dispatch(getAllOrderPending());
    }, 2000);
  };
  /*========// deleteProductFromCart //======*/
}
