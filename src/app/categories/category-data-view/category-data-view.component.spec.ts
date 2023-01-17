import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDataViewComponent } from './category-data-view.component';

describe('CategoryDataViewComponent', () => {
  let component: CategoryDataViewComponent;
  let fixture: ComponentFixture<CategoryDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
