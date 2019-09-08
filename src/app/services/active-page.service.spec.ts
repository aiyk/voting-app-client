import { TestBed } from '@angular/core/testing';

import { ActivePageService } from './active-page.service';

describe('ActivePageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivePageService = TestBed.get(ActivePageService);
    expect(service).toBeTruthy();
  });
});
