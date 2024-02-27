import { getUsersList, getUsersPosts } from './store/users/users.selectors';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ToastrService } from 'ngx-toastr';
import { getUsersPending, getUsersFellfield } from './store/users/users.action';
import { User } from './models/user.model';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-app-ngrx';
  usersList: User[];
  postsList: any = [];
  store: Store = inject(Store);
  isLooding: boolean = false;
  constructor(public toast: ToastrService) {}

  ngOnInit() {}
}
