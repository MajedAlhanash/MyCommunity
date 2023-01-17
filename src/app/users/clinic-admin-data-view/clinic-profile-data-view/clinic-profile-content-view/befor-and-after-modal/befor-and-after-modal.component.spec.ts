import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforAndAfterModalComponent } from './befor-and-after-modal.component';

describe('BeforAndAfterModalComponent', () => {
  let component: BeforAndAfterModalComponent;
  let fixture: ComponentFixture<BeforAndAfterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeforAndAfterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeforAndAfterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
