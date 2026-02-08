import { TestBed } from '@angular/core/testing';

import { SubcategoriesResponseService } from './subcategories-response.service';

describe('SubcategoriesResponseService', () => {
  let service: SubcategoriesResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriesResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
