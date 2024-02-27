import { ProductCardComponent } from './../home/product-card/product-card.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, ProductDetailsRoutingModule],
})
export class ProductDetailsModule {}
