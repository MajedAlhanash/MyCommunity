import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedDataViewComponent } from './confirmed-data-view.component';

describe('ConfirmedDataViewComponent', () => {
  let component: ConfirmedDataViewComponent;
  let fixture: ComponentFixture<ConfirmedDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
