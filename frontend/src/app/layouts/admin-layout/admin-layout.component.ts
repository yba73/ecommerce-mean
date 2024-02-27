import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, inject, OnInit } from '@angular/core';
import { logoutAction } from 'src/app/store/users/users.action';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css', '../../../styles.css'],
})
export class AdminLayoutComponent implements OnInit {
  showNavMenue: boolean = false;
  store: Store = inject(Store);
  router: Router = inject(Router);
  isLooding: boolean = false;
  isAdmin: boolean = false;
  togglerNavbar = () => {
    this.showNavMenue = !this.showNavMenue;
  };

  logout = () => {
    this.store.dispatch(logoutAction());
    this.router.navigate(['/login']);
  };

  ngOnInit(): void {
    this.store.subscribe((states: any) => {
      this.isAdmin = states.users.isAdmin;
      this.isLooding = states.users.isLooding;
    });
  }
}
