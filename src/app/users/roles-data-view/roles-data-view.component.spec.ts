import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesDataViewComponent } from './roles-data-view.component';

describe('RolesDataViewComponent', () => {
  let component: RolesDataViewComponent;
  let fixture: ComponentFixture<RolesDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
