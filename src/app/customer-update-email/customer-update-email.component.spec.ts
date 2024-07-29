import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateEmailComponent } from './customer-update-email.component';

describe('CustomerUpdateEmailComponent', () => {
  let component: CustomerUpdateEmailComponent;
  let fixture: ComponentFixture<CustomerUpdateEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdateEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUpdateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
