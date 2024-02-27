import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSchema } from '../../utils/validations/user-schemas';
import { Component, inject } from '@angular/core';
import { loginUserPending } from 'src/app/store/users/users.action';
@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.css']
})
export class AuthAdminComponent {
  store: Store = inject(Store);

  router: Router = inject(Router);
  errors: {
    email?: string;
    password?: string;
    invalid: boolean;
  } = {
    invalid: true,
  };
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  initialization = () => {
    this.email = new FormControl('');
    this.password = new FormControl('');
  };
  createForm = () => {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  };
  constructor() {
    this.initialization();
    this.createForm();
  }
  signIn = () => {
    this.store.dispatch(loginUserPending({ user: this.loginForm.value }));
  };

  /*====== showErros =====*/
  showErros = () => {
    this.errors = {
      email: '',
      password: '',
      invalid: true,
    };
    loginSchema
      .validate(this.loginForm.value, { abortEarly: false })
      .then((result: any) => {
        this.errors.invalid = false;
      })
      .catch((errorsLop) => {
        this.errors.invalid = true;
        errorsLop.inner.forEach((error: any) => {
          if (error.path === 'email') {
            this.errors.email = error.message;
          } else if (error.path === 'password') {
            this.errors.password = error.message;
          }
        });
      });
  };
  /*====//   showErros //=====*/
}
