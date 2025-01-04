import { TestBed } from '@angular/core/testing';

import { RecordFactoriesService } from './record-factories.service';

describe('RecordFactoriesService', () => {
  let service: RecordFactoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordFactoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
