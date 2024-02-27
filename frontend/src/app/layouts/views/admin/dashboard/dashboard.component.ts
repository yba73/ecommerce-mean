import { createProductPending } from './../../../../store/products/products.actions';
import { createProductSchema } from './../../../../utils/validations/products.schemas';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../../../styles.css'],
})
export class DashboardComponent {
  store: Store = inject(Store);
  imageFile: File;
  router: Router = inject(Router);

  productsCount: number;
  ordersCount: number;
  usersCount: number;
  errors: {
    title?: string;
    description?: string;
    image?: string;
    genre?: string;
    count?: string;
    price?: string;
    invalid?: boolean;
  } = {
    invalid: true,
  };
  productForm: FormGroup;
  title: FormControl;
  description: FormControl;
  price: FormControl;

  image: FormControl;
  genre: FormControl;
  count: FormControl;
  initialization = () => {
    this.title = new FormControl('title');
    this.description = new FormControl('deescr');
    this.image = new FormControl('');
    this.genre = new FormControl('drama');
    this.count = new FormControl(25);
    this.price = new FormControl(20);
  };
  createForm = () => {
    this.productForm = new FormGroup({
      title: this.title,
      description: this.description,
      image: this.image,
      genre: this.genre,
      count: this.count,
      price: this.price,
    });
  };

  getImage = (event: any) => {
    return (this.productForm.value.image = event.files[0]);
  };
  showErros = (event?: any) => {
    const imageType: string = event?.files[0].type;
    this.imageFile = event?.files[0];
    this.errors = {
      title: '',
      description: '',
      price: '',
      genre: '',
      image: '',
      count: '',
      invalid: true,
    };
    this.productForm.value.iamge = imageType;
    console.log('values', this.productForm.value);

    createProductSchema
      .validate(this.productForm.value, { abortEarly: false })
      .then((result: any) => {
        this.errors.invalid = false;
      })
      .catch((errorsLop) => {
        this.errors.invalid = true;
        errorsLop.inner.forEach((error: any) => {
          console.log('error path', error.path);

          switch (error.path) {
            case 'title': {
              return (this.errors.title = error.message);
            }
            case 'description': {
              return (this.errors.description = error.message);
            }
            case 'image': {
              return (this.errors.image = error.message);
            }
            case 'price': {
              return (this.errors.price = error.message);
            }
            case 'count': {
              return (this.errors.count = error.message);
            }
            case 'genre': {
              return (this.errors.genre = error.message);
            }
          }
        });
      });
  };
  createProduct = () => {
    this.productForm.value.image = this.imageFile;
    console.log('values', this.productForm.value);

    this.store.dispatch(createProductPending(this.productForm.value));
  };
  constructor() {
    this.initialization();
    this.createForm();
  }
}
