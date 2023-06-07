import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentExchangeRateService {

  constructor(private http: HttpClient) { }

  getCurrentExchangeRate(apiKey: string, fromSymbol: string, toSymbol: string) {
    const url = `https://api-brl-exchange.actionlabs.com.br/api/1.0/open/currentExchangeRate?apiKey=${apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`;
    return this.http.get(url);
  }
}