import { HttpErrorResponse } from '@angular/common/http';
import { InsertPhotoUserPending } from './../../../../store/users/users.action';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from './../../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { getUserPending } from 'src/app/store/users/users.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  id: any = this.route.snapshot.paramMap.get('id');
  user: User;
  store: Store = inject(Store);
  isLooding: boolean = true;
  imageForm: FormGroup;
  image: FormControl;
  error: boolean | HttpErrorResponse;
  userId: string;
  insertImage = (event: any) => {
    const image = event.files[0];

    this.id &&
      this.store.dispatch(InsertPhotoUserPending({ id: this.id, image }));

    // setTimeout(() => {
    //   this.id && this.store.dispatch(getUserPending({ id: this.id }));
    // }, 7000);
  };
  ngOnInit(): void {
    this.id && this.store.dispatch(getUserPending({ id: this.id }));

    this.store.subscribe((states: any) => {
      this.user = states.users.userInfo;
      this.isLooding = states.users.isLooding;
      this.userId = states.users.id;
      console.log(' this.userId', this.userId);
    });
    console.log('profile page');
    console.log('id details', this.id);
  }
}
