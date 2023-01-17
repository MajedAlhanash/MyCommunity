import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesStoreDataViewComponent } from './archives-store-data-view.component';

describe('ArchivesStoreDataViewComponent', () => {
  let component: ArchivesStoreDataViewComponent;
  let fixture: ComponentFixture<ArchivesStoreDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesStoreDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivesStoreDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
