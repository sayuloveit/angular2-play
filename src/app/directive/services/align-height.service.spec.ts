import { TestBed, inject } from '@angular/core/testing';

import { AlignHeightService } from './align-height.service';

describe('AlignHeightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlignHeightService]
    });
  });

  it('should ...', inject([AlignHeightService], (service: AlignHeightService) => {
    expect(service).toBeTruthy();
  }));
});
