import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicProfileContentViewComponent } from './clinic-profile-content-view.component';

describe('ClinicProfileContentViewComponent', () => {
  let component: ClinicProfileContentViewComponent;
  let fixture: ComponentFixture<ClinicProfileContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicProfileContentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicProfileContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
