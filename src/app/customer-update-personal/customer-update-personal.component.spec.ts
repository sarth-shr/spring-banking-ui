import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdatePersonalComponent } from './customer-update-personal.component';

describe('CustomerUpdatePersonalComponent', () => {
  let component: CustomerUpdatePersonalComponent;
  let fixture: ComponentFixture<CustomerUpdatePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdatePersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUpdatePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
