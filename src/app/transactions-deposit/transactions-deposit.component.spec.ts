import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDepositComponent } from './transactions-deposit.component';

describe('TransactionsDepositComponent', () => {
  let component: TransactionsDepositComponent;
  let fixture: ComponentFixture<TransactionsDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
