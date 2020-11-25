import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDishTypeComponent } from './add-edit-dish-type.component';

describe('AddEditDishTypeComponent', () => {
  let component: AddEditDishTypeComponent;
  let fixture: ComponentFixture<AddEditDishTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDishTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDishTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
