import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardAccountsComponent } from './admin-dashboard-accounts.component';

describe('AdminDashboardAccountsComponent', () => {
  let component: AdminDashboardAccountsComponent;
  let fixture: ComponentFixture<AdminDashboardAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
