import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardTransactionsComponent } from './admin-dashboard-transactions.component';

describe('AdminDashboardTransactionsComponent', () => {
  let component: AdminDashboardTransactionsComponent;
  let fixture: ComponentFixture<AdminDashboardTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
