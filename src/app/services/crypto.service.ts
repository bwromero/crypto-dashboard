import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { CryptoData } from '../components/models';

export interface CryptoPrice {
  prices: [number, number][]; // [timestamp, price]
}

export interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CoinGeckoDetailData {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    twitter_screen_name: string;
    subreddit_url: string;
    telegram_channel_identifier: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
  };
  contract_address?: string;
  platforms?: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

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

  getMarketData(page: number = 1, perPage: number = 100, currency: string = 'usd'): Observable<CryptoData[]> {
    this.isLoadingSubject.next(true);
    
    return this.http.get<CoinGeckoMarketData[]>(
      `${this.baseUrl}/coins/markets`,
      {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: perPage.toString(),
          page: page.toString(),
          sparkline: 'true',
          price_change_percentage: '24h,7d'
        }
      }
    ).pipe(
      map((data: CoinGeckoMarketData[]) => {
        this.isLoadingSubject.next(false);
        return this.transformToCryptoData(data);
      })
    );
  }

  getCryptoById(id: string, currency: string = 'usd'): Observable<CryptoData> {
    this.isLoadingSubject.next(true);
    
    return this.http.get<CoinGeckoMarketData[]>(
      `${this.baseUrl}/coins/markets`,
      {
        params: {
          vs_currency: currency,
          ids: id,
          sparkline: 'true',
          price_change_percentage: '24h,7d'
        }
      }
    ).pipe(
      map((data: CoinGeckoMarketData[]) => {
        this.isLoadingSubject.next(false);
        if (data && data.length > 0) {
          return this.transformToCryptoData(data)[0];
        }
        throw new Error(`Crypto with id ${id} not found`);
      })
    );
  }

  getCryptoDetailById(id: string): Observable<CoinGeckoDetailData> {
    this.isLoadingSubject.next(true);
    
    return this.http.get<CoinGeckoDetailData>(
      `${this.baseUrl}/coins/${id}`,
      {
        params: {
          localization: 'false',
          tickers: 'false',
          market_data: 'true',
          community_data: 'true',
          developer_data: 'false',
          sparkline: 'false'
        }
      }
    ).pipe(
      map((data: CoinGeckoDetailData) => {
        this.isLoadingSubject.next(false);
        return data;
      })
    );
  }

  private transformToCryptoData(apiData: CoinGeckoMarketData[]): CryptoData[] {
    return apiData.map((coin, index) => ({
      id: coin.id,
      rank: coin.market_cap_rank || index + 1,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      icon: coin.image,
      price: coin.current_price || 0,
      change24h: coin.price_change_percentage_24h || 0,
      change7d: coin.price_change_percentage_7d_in_currency || 0,
      marketCap: coin.market_cap || 0,
      volume24h: coin.total_volume || 0,
      circulatingSupply: coin.circulating_supply || 0,
      totalSupply: coin.total_supply || 0,
      chartData: this.generateChartData(coin.sparkline_in_7d?.price || []),
      isFavorite: false,
      categoryId: this.getCategoryId(coin.symbol)
    }));
  }

  private generateChartData(sparklineData: number[]): number[] {
    if (!sparklineData || sparklineData.length === 0) {
      return [0, 0, 0, 0];
    }
    
    // Take the last 4 data points or pad with the last value
    const lastValue = sparklineData[sparklineData.length - 1] || 0;
    const chartData = sparklineData.slice(-4);
    
    // Pad with last value if we have less than 4 points
    while (chartData.length < 4) {
      chartData.unshift(lastValue);
    }
    
    return chartData;
  }

  private getCategoryId(symbol: string): string {
    const categoryMap: { [key: string]: string } = {
      'btc': 'bitcoin',
      'eth': 'ethereum',
      'bnb': 'exchange',
      'sol': 'layer1',
      'ada': 'layer1',
      'dot': 'layer1',
      'avax': 'layer1',
      'matic': 'layer2',
      'link': 'oracle',
      'uni': 'defi',
      'atom': 'layer1',
      'ltc': 'bitcoin',
      'bch': 'bitcoin',
      'xrp': 'payment',
      'doge': 'meme'
    };
    
    return categoryMap[symbol.toLowerCase()] || 'other';
  }
} 