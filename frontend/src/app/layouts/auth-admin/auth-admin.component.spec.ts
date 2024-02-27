import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminComponent } from './auth-admin.component';

describe('AuthAdminComponent', () => {
  let component: AuthAdminComponent;
  let fixture: ComponentFixture<AuthAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthAdminComponent]
    });
    fixture = TestBed.createComponent(AuthAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
