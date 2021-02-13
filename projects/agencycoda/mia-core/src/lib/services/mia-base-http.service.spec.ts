import { TestBed } from '@angular/core/testing';

import { MiaBaseHttpService } from './mia-base-http.service';

describe('MiaBaseHttpService', () => {
  let service: MiaBaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaBaseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
