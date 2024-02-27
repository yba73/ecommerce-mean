import { getProductsPending } from 'src/app/store/products/products.actions';
import { Cart } from 'src/app/models/carts.model';
import { addProductCartPending } from './../../../../../store/cart/carts.actions';
import { Router } from '@angular/router';
import { Product } from './../../../../../models/products.model';
import { Component, Input, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [
    './product-card.component.css',
    '../products-list/products-list.component.css',
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  router: Router = inject(Router);
  isAuth: boolean = false;
  isAdmin: boolean = false;

  store: Store = inject(Store);
  isLooding: boolean = true;

  addToCart = (id: string) => {
    this.store.dispatch(addProductCartPending({ id }));
  };
  goToProductDetails = () => {
    this.router.navigate(['/product/details', this.product._id]);
  };
  ngOnInit(): void {
    this.store.subscribe((states: any) => {
      this.isAuth = states.users.isAuth;
      this.isLooding = states.users.isLooding;
      this.isAdmin = states.users.isAdmin;
    });
  }
}
