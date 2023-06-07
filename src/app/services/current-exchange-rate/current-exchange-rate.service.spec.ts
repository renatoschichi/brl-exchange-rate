import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CurrentExchangeRateService } from './current-exchange-rate.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('CurrentExchangeRateService', () => {
  let service: CurrentExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrentExchangeRateService],
    });
    service = TestBed.inject(CurrentExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle HTTP errors', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: 'Internal Server Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
    const httpClientSpy = spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(throwError(httpErrorResponse));
  
    service.getCurrentExchangeRate('your-api-key', 'USD', 'BRL').subscribe(
      () => fail('Expected an error, but the request succeeded.'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
        expect(error.error).toBe('Internal Server Error');
      }
    );
  
    expect(httpClientSpy).toHaveBeenCalled();
  });
  
});