import { Component, OnInit, Renderer2 } from '@angular/core';
import { CurrentExchangeRateService } from 'src/app/services/current-exchange-rate/current-exchange-rate.service';
import { DailyExchangeRateService } from 'src/app/services/daily-exchange-rate/daily-exchange-rate.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  visibleItens: boolean = false;
  exchangeRate: number | undefined = 0;
  dailyExchangeRates: any[] = [];
  currentDate: string = '';
  currentTime: string = '';
  currentYear: number = new Date().getFullYear();
  currencyCode: string = '';
  previousDayCloseRate: number = 0;
  selectedCurrencyCode: string = 'USD';

  constructor(
    private renderer: Renderer2,
    private currentExchangeRateService: CurrentExchangeRateService,
    private dailyExchangeRateService: DailyExchangeRateService
  ) { }

  ngOnInit(): void {
    const currentDateObj = new Date();
    this.currentDate = currentDateObj.toLocaleDateString();
    this.currentTime = currentDateObj.toLocaleTimeString();
  }

  toggleItens() {
    this.visibleItens = !this.visibleItens;
    if (this.visibleItens) {
      this.renderer.addClass(document.body, 'visible-footer');
    } else {
      this.renderer.removeClass(document.body, 'visible-footer');
    }
  }

  loadExchangeRates() {
    this.fetchCurrentExchangeRate();
    this.fetchDailyExchangeRate();
  }

  fetchCurrentExchangeRate() {    
    const apiKey = 'RVZG0GHEV2KORLNA';
    const fromSymbol = this.selectedCurrencyCode;
    const toSymbol = 'BRL';

    this.currentExchangeRateService.getCurrentExchangeRate(apiKey, fromSymbol, toSymbol)
      .subscribe((response: any) => {
        this.exchangeRate = response.exchangeRate;
        this.currencyCode = this.selectedCurrencyCode;
      });
  }

  fetchDailyExchangeRate() {
    const apiKey = 'RVZG0GHEV2KORLNA';
    const fromSymbol = this.selectedCurrencyCode;
    const toSymbol = 'BRL';
  
    this.dailyExchangeRateService.getDailyExchangeRate(apiKey, fromSymbol, toSymbol)
      .subscribe((response: any) => {
        this.dailyExchangeRates = response.data;
        if (this.dailyExchangeRates && this.dailyExchangeRates.length > 0) {
          this.calculatePreviousDayCloseRate();
        }
      });
  }
  
  calculatePreviousDayCloseRate() {
    for (let i = 1; i < this.dailyExchangeRates.length; i++) {
      const currentRate = this.dailyExchangeRates[i].close;
      const previousRate = this.dailyExchangeRates[i - 1].close;
      this.dailyExchangeRates[i].close_diff = (currentRate - previousRate).toFixed(4);
    }
    this.previousDayCloseRate = this.dailyExchangeRates[0].close;
  }  

}
