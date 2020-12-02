import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIngredientConfirmComponent } from './delete-ingredient-confirm.component';

describe('DeleteIngredientConfirmComponent', () => {
  let component: DeleteIngredientConfirmComponent;
  let fixture: ComponentFixture<DeleteIngredientConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteIngredientConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIngredientConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
