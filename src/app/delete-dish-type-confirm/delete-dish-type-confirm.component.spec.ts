import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDishTypeConfirmComponent } from './delete-dish-type-confirm.component';

describe('DeleteDishTypeConfirmComponent', () => {
  let component: DeleteDishTypeConfirmComponent;
  let fixture: ComponentFixture<DeleteDishTypeConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDishTypeConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDishTypeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
