import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, ProductsListComponent, ProductCardComponent],
  imports: [CommonModule, HomeRoutingModule, RouterModule],
})
export class HomeModule {}
