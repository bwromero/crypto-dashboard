import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getCoinData(coinId: string) {
    return this.http.get<CoinData>(`${this.baseUrl}/coins/${coinId}`);
  }

  // Static mapping for coin icons to avoid API rate limits
  getStaticCoinImage(symbol: string): string {
    const coinMap: { [key: string]: string } = {
      'btc': 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
      'usdt': 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      'trx': 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png'
    };
    
    return coinMap[symbol.toLowerCase()] || '';
  }
} 