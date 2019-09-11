import { TestBed } from '@angular/core/testing';

import { LgaService } from './lga.service';

describe('LgaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LgaService = TestBed.get(LgaService);
    expect(service).toBeTruthy();
  });
});
