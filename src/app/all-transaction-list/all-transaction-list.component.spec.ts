import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransactionListComponent } from './all-transaction-list.component';

describe('AllTransactionListComponent', () => {
  let component: AllTransactionListComponent;
  let fixture: ComponentFixture<AllTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
