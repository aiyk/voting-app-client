import { TestBed } from '@angular/core/testing';

import { OfficialService } from './official.service';

describe('OfficialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfficialService = TestBed.get(OfficialService);
    expect(service).toBeTruthy();
  });
});
