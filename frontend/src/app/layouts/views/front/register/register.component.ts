import { registerUserPending } from './../../../../store/users/users.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { registerSchema } from '../../../../utils/validations/user-schemas';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  store: Store = inject(Store);

  router: Router = inject(Router);
  errors: {
    email?: string;
    username?: string;
    password?: string;
    invalid: boolean;
  } = {
    invalid: true,
  };
  registerForm: FormGroup;
  email: FormControl;
  username: FormControl;
  password: FormControl;
  initialization = () => {
    this.email = new FormControl('');
    this.username = new FormControl('');
    this.password = new FormControl('');
  };
  createForm = () => {
    this.registerForm = new FormGroup({
      email: this.email,
      username: this.username,
      password: this.password,
    });
  };
  constructor() {
    this.initialization();
    this.createForm();
  }

  signUp = () => {
    this.store.dispatch(registerUserPending({ user: this.registerForm.value }));

    // this.router.navigate(['/']);
  };

  /*====   showErros   =====*/
  showErros = () => {
    this.errors = {
      email: '',
      username: '',
      password: '',
      invalid: true,
    };
    registerSchema
      .validate(this.registerForm.value, { abortEarly: false })
      .then((result: any) => {
        this.errors.invalid = false;
      })
      .catch((errorsLop) => {
        this.errors.invalid = true;
        errorsLop.inner.forEach((error: any) => {
          if (error.path === 'email') {
            this.errors.email = error.message;
          } else if (error.path === 'username') {
            this.errors.username = error.message;
          } else if (error.path === 'password') {
            this.errors.password = error.message;
          }
        });
      });
  };
  /*====//   showErros //=====*/
}
