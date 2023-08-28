import { TestBed } from '@angular/core/testing';

import { GetbyuserService } from './getbyuser.service';

describe('GetbyuserService', () => {
  let service: GetbyuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetbyuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
