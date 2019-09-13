import { TestBed } from '@angular/core/testing';

import { PoolingUnitService } from './pooling-unit.service';

describe('PoolingUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoolingUnitService = TestBed.get(PoolingUnitService);
    expect(service).toBeTruthy();
  });
});
