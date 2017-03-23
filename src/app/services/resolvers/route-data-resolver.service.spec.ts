import { TestBed, inject } from '@angular/core/testing';

import { RouteDataResolverService } from './route-data-resolver.service';

describe('RouteDataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteDataResolverService]
    });
  });

  it('should ...', inject([RouteDataResolverService], (service: RouteDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
