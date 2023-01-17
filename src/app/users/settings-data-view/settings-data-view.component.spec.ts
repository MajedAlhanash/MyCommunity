import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDataViewComponent } from './settings-data-view.component';

describe('SettingsDataViewComponent', () => {
  let component: SettingsDataViewComponent;
  let fixture: ComponentFixture<SettingsDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
