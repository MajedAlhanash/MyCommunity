import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClinicInfoComponent } from './edit-clinic-info.component';

describe('EditClinicInfoComponent', () => {
  let component: EditClinicInfoComponent;
  let fixture: ComponentFixture<EditClinicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClinicInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClinicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
