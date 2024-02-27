import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  let isAdmin: boolean = JSON.parse(localStorage.getItem('isAdmin') || 'false');
  if (isAdmin) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
