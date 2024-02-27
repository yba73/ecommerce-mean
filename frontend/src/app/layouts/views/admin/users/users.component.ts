import { User } from './../../../../models/user.model';
import { getUsersPending } from './../../../../store/users/users.action';
import { Store } from '@ngrx/store';

import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  store: Store = inject(Store);
  users: User[] = [];
  isLooding: boolean = true;

  ngOnInit(): void {
    this.store.dispatch(getUsersPending());

    this.store.subscribe((state: any) => {
      this.users = state.users.usersList;
      this.isLooding = state.users.isLooding;
      console.log('users', this.users);
    });
  }
}
