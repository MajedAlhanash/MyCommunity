import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesDataViewComponent } from './stories-data-view.component';

describe('StoriesDataViewComponent', () => {
  let component: StoriesDataViewComponent;
  let fixture: ComponentFixture<StoriesDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoriesDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoriesDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
