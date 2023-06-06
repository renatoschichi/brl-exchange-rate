import { TestBed } from '@angular/core/testing';

import { CurrentExchangeRateService } from './current-exchange-rate.service';

describe('CurrentExchangeRateService', () => {
  let service: CurrentExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
