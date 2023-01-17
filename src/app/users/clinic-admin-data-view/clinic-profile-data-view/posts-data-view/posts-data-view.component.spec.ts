import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDataViewComponent } from './posts-data-view.component';

describe('PostsDataViewComponent', () => {
  let component: PostsDataViewComponent;
  let fixture: ComponentFixture<PostsDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
