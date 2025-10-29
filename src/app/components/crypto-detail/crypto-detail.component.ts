import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { CryptoData } from '../models';
import { CryptoService, CoinGeckoDetailData, CoinGeckoTicker } from '../../services/crypto.service';
import { LucideAngularModule, Info } from 'lucide-angular';
import { D3PriceChartComponent, PricePoint } from './d3-price-chart/d3-price-chart.component';

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, D3PriceChartComponent],
  templateUrl: './crypto-detail.component.html',
  styles: []
})
export class CryptoDetailComponent implements OnInit, OnDestroy {
  readonly Info = Info;
  cryptoId: string = '';
  crypto: CryptoData | null = null;
  cryptoDetail: CoinGeckoDetailData | null = null;
  chartData: PricePoint[] = [];
  volumeData: PricePoint[] = [];
  marketCapData: PricePoint[] = [];
  tickers: CoinGeckoTicker[] = [];
  isLoadingTickers: boolean = false;
  isLoading: boolean = true;
  error: string | null = null;
  selectedTimeframe: string = 'ALL';
  activeTab: 'overview' | 'market' | 'historical' = 'overview';
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cryptoId = params['id'];
      this.loadCryptoData(this.cryptoId);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadCryptoData(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.subscription = forkJoin({
      basic: this.cryptoService.getCryptoById(id),
      detail: this.cryptoService.getCryptoDetailById(id),
      chart: this.cryptoService.getMarketChart(id, 90)
    }).subscribe({
      next: (data) => {
        this.crypto = data.basic;
        this.cryptoDetail = data.detail;
        this.chartData = data.chart.prices.map(([timestamp, price]) => ({
          timestamp,
          price
        }));
        this.volumeData = (data.chart.total_volumes || []).map(([timestamp, price]) => ({
          timestamp,
          price
        }));
        this.marketCapData = (data.chart.market_caps || []).map(([timestamp, price]) => ({
          timestamp,
          price
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Failed to load cryptocurrency data: ${err.message}`;
        this.isLoading = false;
        console.error('Error loading crypto:', err);
      }
    });
  }

  changeTimeframe(timeframe: string): void {
    this.selectedTimeframe = timeframe;
    const daysMap: { [key: string]: number } = {
      '1D': 1,
      '7D': 7,
      '14D': 14,
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1Y': 365,
      'YTD': 365,
      'ALL': 'max' as any
    };
    
    const days = daysMap[timeframe] || 90;
    this.cryptoService.getMarketChart(this.cryptoId, days).subscribe({
      next: (data) => {
        this.chartData = data.prices.map(([timestamp, price]) => ({
          timestamp,
          price
        }));
        this.volumeData = (data.total_volumes || []).map(([timestamp, price]) => ({
          timestamp,
          price
        }));
        this.marketCapData = (data.market_caps || []).map(([timestamp, price]) => ({
          timestamp,
          price
        }));
      },
      error: (err) => console.error('Error loading chart:', err)
    });
  }

  getExplorerName(url: string): string {
    if (url.includes('etherscan')) return 'Etherscan';
    if (url.includes('blockchair')) return 'Blockchair';
    if (url.includes('ethplorer')) return 'Ethplorer';
    if (url.includes('oklink')) return 'Oklink';
    if (url.includes('bscscan')) return 'BscScan';
    if (url.includes('polygonscan')) return 'PolygonScan';
    return 'Explorer';
  }

  getContractAddress(): string | null {
    if (!this.cryptoDetail?.platforms) return null;
    const platforms = this.cryptoDetail.platforms;
    return platforms['ethereum'] || platforms['binance-smart-chain'] || platforms['polygon-pos'] || null;
  }

  shortenAddress(address: string): string {
    if (address.length <= 16) return address;
    return `${address.slice(0, 6)}...${address.slice(-8)}`;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Address copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  changeTab(tab: 'overview' | 'market' | 'historical'): void {
    this.activeTab = tab;
    if (tab === 'market' && this.tickers.length === 0 && !this.isLoadingTickers) {
      this.loadTickers();
    }
  }

  private loadTickers(): void {
    this.isLoadingTickers = true;
    this.cryptoService.getTickers(this.cryptoId).subscribe({
      next: (tickers) => {
        this.tickers = tickers.slice(0, 20);
        this.isLoadingTickers = false;
      },
      error: (err) => {
        console.error('Error loading tickers:', err);
        this.isLoadingTickers = false;
      }
    });
  }

  getDescription(): string {
    if (!this.cryptoDetail?.description?.en) return 'No description available.';
    const fullDesc = this.cryptoDetail.description.en;
    const plainText = fullDesc.replace(/<[^>]*>/g, '');
    return plainText.length > 500 ? plainText.substring(0, 500) + '...' : plainText;
  }

  getHistoricalData(): any[] {
    if (!this.chartData || this.chartData.length === 0) return [];
    if (!this.volumeData || this.volumeData.length === 0) return [];
    if (!this.marketCapData || this.marketCapData.length === 0) return [];
    
    const priceData = this.chartData.slice().reverse();
    const volumeDataReversed = this.volumeData.slice().reverse();
    const marketCapDataReversed = this.marketCapData.slice().reverse();
    const result: any[] = [];
    
    const maxLength = Math.min(
      priceData.length, 
      volumeDataReversed.length, 
      marketCapDataReversed.length,
      30
    );
    
    for (let i = 0; i < maxLength; i++) {
      const current = priceData[i];
      const previous = priceData[i + 1];
      const volumeAtIndex = volumeDataReversed[i];
      const marketCapAtIndex = marketCapDataReversed[i];
      
      if (current && volumeAtIndex && marketCapAtIndex) {
        result.push({
          date: new Date(current.timestamp),
          price: current.price,
          marketCap: marketCapAtIndex.price,
          volume: volumeAtIndex.price,
          change: previous ? ((current.price - previous.price) / previous.price) * 100 : 0
        });
      }
    }
    
    return result;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getTrustScoreColor(trustScore: string): string {
    if (trustScore === 'green') return 'bg-action';
    if (trustScore === 'yellow') return 'bg-yellow-500';
    return 'bg-slate-600';
  }
}

