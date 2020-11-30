import { TestBed } from '@angular/core/testing';

import { PageUtilsService } from './page-utils.service';

describe('PageUtilsService', () => {
  let service: PageUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
