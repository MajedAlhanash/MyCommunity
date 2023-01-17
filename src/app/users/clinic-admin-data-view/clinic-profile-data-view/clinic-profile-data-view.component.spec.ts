import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicProfileDataViewComponent } from './clinic-profile-data-view.component';

describe('ClinicProfileDataViewComponent', () => {
  let component: ClinicProfileDataViewComponent;
  let fixture: ComponentFixture<ClinicProfileDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicProfileDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicProfileDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
