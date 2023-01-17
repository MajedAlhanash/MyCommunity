import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedModalComponent } from './confirmed-modal.component';

describe('ConfirmedModalComponent', () => {
  let component: ConfirmedModalComponent;
  let fixture: ComponentFixture<ConfirmedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
