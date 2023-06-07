import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DailyExchangeRateService } from './daily-exchange-rate.service';

describe('DailyExchangeRateService', () => {
  let service: DailyExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DailyExchangeRateService],
    });
    service = TestBed.inject(DailyExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve daily exchange rate', () => {
    const apiKey = 'your-api-key';
    const fromSymbol = 'USD';
    const toSymbol = 'BRL';
    const mockResponse = { exchangeRate: 5.0 };

    service.getDailyExchangeRate(apiKey, fromSymbol, toSymbol).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(
      `https://api-brl-exchange.actionlabs.com.br/api/1.0/open/dailyExchangeRate?apiKey=${apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });
});
