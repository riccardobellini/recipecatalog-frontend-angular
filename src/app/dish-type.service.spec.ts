/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DishTypeService } from './dish-type.service';

describe('DishTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DishTypeService]
    });
  });

  it('should ...', inject([DishTypeService], (service: DishTypeService) => {
    expect(service).toBeTruthy();
  }));
});
