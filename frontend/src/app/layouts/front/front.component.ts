import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, inject, OnInit } from '@angular/core';
import { logoutAction } from 'src/app/store/users/users.action';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css', '../../../styles.css'],
})
export class FrontComponent implements OnInit {
  showNavMenue: boolean = false;
  isAuth: boolean;
  isAdmin?: boolean;
  router: Router = inject(Router);
  id: string;
  store: Store = inject(Store);
  toast: ToastrService = inject(ToastrService);
  togglerNavbar = () => {
    this.showNavMenue = !this.showNavMenue;
  };

  logout = () => {
    this.store.dispatch(logoutAction());
    this.router.navigate(['/login']);
    this.toast.success('logout user success');
  };
  ngOnInit(): void {
    this.store.subscribe((store: any) => {
      this.isAuth = store.users.isAuth;
      this.id = store.users.id;
    });
  }
}
