import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCustomUsersComponent } from './display-custom-users.component';

describe('DisplayCustomUsersComponent', () => {
  let component: DisplayCustomUsersComponent;
  let fixture: ComponentFixture<DisplayCustomUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCustomUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCustomUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
