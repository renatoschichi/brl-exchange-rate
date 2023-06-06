import { TestBed } from '@angular/core/testing';

import { DailyExchangeRateService } from './daily-exchange-rate.service';

describe('DailyExchangeRateService', () => {
  let service: DailyExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
