import { LayoutsModule } from './layouts/layouts.module';
import { UserEffect } from './store/users/users.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/store';
import { StoreModule } from '@ngrx/store';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { ProductsEffects } from './store/products/ProductsEffects';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CartsEffect } from './store/cart/carts.effects';
import { OrdersEffect } from './store/orders/order.effcets';
import { SharedModule } from './shared/shared/shared.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
//    SharedModule,

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffect,
      ProductsEffects,
      CartsEffect,
      OrdersEffect,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SharedModule, LoaderComponent],
})
export class AppModule {}
