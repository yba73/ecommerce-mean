import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {


  const router: Router = inject(Router);
  let isAuth: boolean = JSON.parse(localStorage.getItem('isAuth') || 'false');
  if (isAuth) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
