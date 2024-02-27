import { getProductPending } from './../../../../store/products/products.actions';
import { Product } from './../../../../models/products.model';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  id: string | null = this.route.snapshot.paramMap.get('id');
  store: Store = inject(Store);
  product: Product;
  isAuth: boolean = false;
  isLooding: boolean = true;
  count: number;
  ngOnInit(): void {
    this.id && this.store.dispatch(getProductPending({ id: this.id }));
    this.store.subscribe((store: any) => {
      this.product = store.products.productDetails;
      this.isLooding = store.products.isLooding;
      this.isAuth = store.users.isAuth;
      this.count = store.products.count;
    });
  }
  constructor() {}
}
