import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CryptoPrice {
  prices: [number, number][]; // [timestamp, price]
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getPriceHistory(coinId: string, days: number = 7, currency: string = 'usd'): Observable<CryptoPrice> {
    return this.http.get<CryptoPrice>(
      `${this.baseUrl}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: currency,
          days: days.toString(),
          interval: 'daily'
        }
      }
    );
  }

  getMultiplePriceHistories(coinIds: string[], days: number = 7, currency: string = 'usd'): Observable<Map<string, CryptoPrice>> {
    const requests = coinIds.map(coinId => 
      this.getPriceHistory(coinId, days, currency).pipe(
        map(data => ({ coinId, data }))
      )
    );

    return new Observable(subscriber => {
      const priceMap = new Map<string, CryptoPrice>();
      let completed = 0;

      requests.forEach(request => {
        request.subscribe({
          next: ({ coinId, data }) => {
            priceMap.set(coinId, data);
            completed++;
            if (completed === requests.length) {
              subscriber.next(priceMap);
              subscriber.complete();
            }
          },
          error: (error) => subscriber.error(error)
        });
      });
    });
  }
} 