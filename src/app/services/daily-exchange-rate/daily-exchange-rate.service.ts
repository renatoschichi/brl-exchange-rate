import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyExchangeRateService {

  private apiUrl = 'https://api-brl-exchange.actionlabs.com.br/api/1.0';

  constructor(private http: HttpClient) { }

  getDailyExchangeRate(apiKey: string, fromSymbol: string, toSymbol: string): Observable<any> {
    const url = `${this.apiUrl}/open/dailyExchangeRate?apiKey=${apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`;
    return this.http.get(url);
  }
}