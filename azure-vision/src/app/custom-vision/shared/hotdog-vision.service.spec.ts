import { TestBed } from '@angular/core/testing';

import { HotdogVisionService } from './hotdog-vision.service';

describe('HotdogVisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotdogVisionService = TestBed.get(HotdogVisionService);
    expect(service).toBeTruthy();
  });
});
