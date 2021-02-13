import { TestBed } from '@angular/core/testing';

import { MiaCoreService } from './mia-core.service';

describe('MiaCoreService', () => {
  let service: MiaCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
