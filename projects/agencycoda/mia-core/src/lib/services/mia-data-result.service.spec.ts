import { TestBed } from '@angular/core/testing';

import { MiaDataResultService } from './mia-data-result.service';

describe('MiaDataResultService', () => {
  let service: MiaDataResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaDataResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
