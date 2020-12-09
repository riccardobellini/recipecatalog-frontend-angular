import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookConfirmComponent } from './delete-book-confirm.component';

describe('DeleteBookConfirmComponent', () => {
  let component: DeleteBookConfirmComponent;
  let fixture: ComponentFixture<DeleteBookConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBookConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
