import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdatePasswordComponent } from './customer-update-password.component';

describe('CustomerUpdatePasswordComponent', () => {
  let component: CustomerUpdatePasswordComponent;
  let fixture: ComponentFixture<CustomerUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdatePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
