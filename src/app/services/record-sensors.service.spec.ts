import { TestBed } from '@angular/core/testing';

import { RecordSensorsService } from './record-sensors.service';

describe('RecordSensorsService', () => {
  let service: RecordSensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordSensorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
