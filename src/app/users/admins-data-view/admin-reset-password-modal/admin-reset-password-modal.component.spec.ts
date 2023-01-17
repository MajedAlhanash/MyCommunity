import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetPasswordModalComponent } from './admin-reset-password-modal.component';

describe('AdminResetPasswordModalComponent', () => {
  let component: AdminResetPasswordModalComponent;
  let fixture: ComponentFixture<AdminResetPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminResetPasswordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminResetPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
