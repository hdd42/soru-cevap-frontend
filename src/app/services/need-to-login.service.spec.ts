import { TestBed, inject } from '@angular/core/testing';

import { NeedToLoginService } from './need-to-login.service';

describe('NeedToLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeedToLoginService]
    });
  });

  it('should ...', inject([NeedToLoginService], (service: NeedToLoginService) => {
    expect(service).toBeTruthy();
  }));
});
