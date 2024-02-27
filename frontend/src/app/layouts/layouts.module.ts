import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FrontComponent } from './front/front.component';
import { AuthAdminComponent } from './auth-admin/auth-admin.component';
import { SharedModule } from '../shared/shared/shared.module';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminLayoutComponent, FrontComponent, AuthAdminComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class LayoutsModule {}
