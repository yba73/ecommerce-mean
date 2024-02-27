import {} from './../../../../../store/store';
import { Product } from './../../../../../models/products.model';
import { getProductsPending } from 'src/app/store/products/products.actions';
import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  store: Store = inject(Store);
  route: ActivatedRoute = inject(ActivatedRoute);
  products: Product[];
  isLooding: boolean = true;
  id: string | null;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(getProductsPending());
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.subscribe((state: any) => {
      this.products = state.products.productsList;
      this.isLooding = state.products.isLooding;
      this.isAdmin = state.users.isAdmin;
    });
  }
}
