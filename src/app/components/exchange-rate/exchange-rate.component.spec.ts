import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ExchangeRateComponent } from './exchange-rate.component';
import { CurrentExchangeRateService } from 'src/app/services/current-exchange-rate/current-exchange-rate.service';
import { DailyExchangeRateService } from 'src/app/services/daily-exchange-rate/daily-exchange-rate.service';

describe('ExchangeRateComponent', () => {
  let component: ExchangeRateComponent;
  let fixture: ComponentFixture<ExchangeRateComponent>;
  let currentExchangeRateServiceMock: Partial<CurrentExchangeRateService>;
  let dailyExchangeRateServiceMock: Partial<DailyExchangeRateService>;

  beforeEach(async () => {
    currentExchangeRateServiceMock = {
      getCurrentExchangeRate: () => of({ exchangeRate: 5.0 })
    };
    dailyExchangeRateServiceMock = {
      getDailyExchangeRate: () => of({ data: [{ close: 10.0 }, { close: 12.0 }] })
    };

    await TestBed.configureTestingModule({
      declarations: [ExchangeRateComponent],
      providers: [
        { provide: CurrentExchangeRateService, useValue: currentExchangeRateServiceMock },
        { provide: DailyExchangeRateService, useValue: dailyExchangeRateServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch daily exchange rate', () => {
    const dailyExchangeRateServiceSpy = spyOn(component['dailyExchangeRateService'], 'getDailyExchangeRate').and.returnValue(of({ data: [{ close: 1 }, { close: 2 }] }));
  
    component.fetchDailyExchangeRate();
  
    expect(dailyExchangeRateServiceSpy).toHaveBeenCalled();
    expect(component.dailyExchangeRates).toEqual([{ close: 1 }, { close: 2 }]);
  });

  it('should fetch current exchange rate', () => {
    component.selectedCurrencyCode = 'USD';
    component.fetchCurrentExchangeRate();

    expect(component.exchangeRate).toBe(5.0);
    expect(component.currencyCode).toBe('USD');
  });

  it('should fetch daily exchange rate', () => {
    component.selectedCurrencyCode = 'USD';
    component.fetchDailyExchangeRate();

    expect(component.dailyExchangeRates).toEqual([{ close: 10.0 }, { close: 12.0 }]);
    expect(component.previousDayCloseRate).toBe(10.0);
    expect(component.isDataLoaded).toBe(true);
  });
});
