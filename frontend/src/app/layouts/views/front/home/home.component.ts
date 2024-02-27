import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import {
  getProductsPending,
  getProductsFelllfield,
} from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  store: Store = inject(Store);


  ngOnInit(): void {}
}
