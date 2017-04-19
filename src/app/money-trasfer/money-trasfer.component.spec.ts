import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTrasferComponent } from './money-trasfer.component';

describe('MoneyTrasferComponent', () => {
  let component: MoneyTrasferComponent;
  let fixture: ComponentFixture<MoneyTrasferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyTrasferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTrasferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
