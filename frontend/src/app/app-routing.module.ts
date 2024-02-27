import { userGuard } from './guards/user/user.guard';
import { AuthAdminComponent } from './layouts/auth-admin/auth-admin.component';
import { adminGuard } from './guards/admin/admin.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontComponent } from './layouts/front/front.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin/login',

    component: AuthAdminComponent,
  },
  {
    path: '',
    component: FrontComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/views/front/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./layouts/views/front/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./layouts/views/front/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'profile/:id',
        pathMatch: 'full',
        canActivateChild: [userGuard],
        loadChildren: () =>
          import('./layouts/views/front/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'cart',
        canActivateChild: [userGuard],

        loadChildren: () =>
          import('./layouts/views/front/cart/cart.module').then(
            (m) => m.CartModule
          ),
      },
      {
        path: 'order',
        canActivateChild: [userGuard],

        loadChildren: () =>
          import('./layouts/views/front/order/order.module').then(
            (m) => m.OrderModule
          ),
      },
      {
        path: 'product/details/:id',
        pathMatch: 'full',
        loadChildren: () =>
          import(
            './layouts/views/front/product-details/product-details.module'
          ).then((m) => m.ProductDetailsModule),
      },
    ],
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',

        loadChildren: () =>
          import('./layouts/views/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'users',

        loadChildren: () =>
          import('./layouts/views/admin/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'orders',

        loadChildren: () =>
          import('./layouts/views/admin/orders/orders.module').then(
            (m) => m.OrdersModule
          ),
      },
      {
        path: 'products',

        loadChildren: () =>
          import('./layouts/views/front/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
