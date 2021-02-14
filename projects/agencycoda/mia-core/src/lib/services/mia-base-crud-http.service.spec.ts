import { TestBed } from '@angular/core/testing';

import { MiaBaseCrudHttpService } from './mia-base-crud-http.service';

describe('MiaBaseCrudHttpService', () => {
  let service: MiaBaseCrudHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaBaseCrudHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
