import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicResetPasswordModalComponent } from './clinic-reset-password-modal.component';

describe('ClinicResetPasswordModalComponent', () => {
  let component: ClinicResetPasswordModalComponent;
  let fixture: ComponentFixture<ClinicResetPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicResetPasswordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicResetPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
