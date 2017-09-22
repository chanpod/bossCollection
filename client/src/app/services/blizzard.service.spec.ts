import { TestBed, inject } from '@angular/core/testing';

import { BlizzardService } from './blizzard.service';

describe('BlizzardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlizzardService]
    });
  });

  it('should be created', inject([BlizzardService], (service: BlizzardService) => {
    expect(service).toBeTruthy();
  }));
});
