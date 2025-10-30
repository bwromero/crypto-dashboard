import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { CryptoData } from '../shared/models';
import {
  CryptoService,
  CoinGeckoDetailData,
  CoinGeckoTicker,
} from '../../services/crypto.service';
import { LucideAngularModule, Info } from 'lucide-angular';
import {
  D3PriceChartComponent,
  PricePoint,
} from './d3-price-chart/d3-price-chart.component';
import { TabsComponent } from './tabs/tabs.component';
import { CryptoHeaderComponent } from './crypto-header/crypto-header.component';

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    TabsComponent,
    CryptoHeaderComponent,
  ],
  templateUrl: './crypto-detail.component.html',
  styles: [],
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

  readonly tabs = ['Overview', 'Market', 'Project Info', 'Historical Data'];
  activeTab = 'Overview';

  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
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
      chart: this.cryptoService.getMarketChart(id, 90),
    }).subscribe({
      next: (data) => {
        this.crypto = data.basic;
        this.cryptoDetail = data.detail;
        this.chartData = data.chart.prices.map(([timestamp, price]) => ({
          timestamp,
          price,
        }));
        this.volumeData = (data.chart.total_volumes || []).map(
          ([timestamp, price]) => ({
            timestamp,
            price,
          })
        );
        this.marketCapData = (data.chart.market_caps || []).map(
          ([timestamp, price]) => ({
            timestamp,
            price,
          })
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Failed to load cryptocurrency data: ${err.message}`;
        this.isLoading = false;
        console.error('Error loading crypto:', err);
      },
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
      YTD: 365,
      ALL: 'max' as any,
    };

    const days = daysMap[timeframe] || 90;
    this.cryptoService.getMarketChart(this.cryptoId, days).subscribe({
      next: (data) => {
        this.chartData = data.prices.map(([timestamp, price]) => ({
          timestamp,
          price,
        }));
        this.volumeData = (data.total_volumes || []).map(
          ([timestamp, price]) => ({
            timestamp,
            price,
          })
        );
        this.marketCapData = (data.market_caps || []).map(
          ([timestamp, price]) => ({
            timestamp,
            price,
          })
        );
      },
      error: (err) => console.error('Error loading chart:', err),
    });
  }

  changeTab(label: string): void {
    this.activeTab = label;
    if (this.activeTab === 'Market' && this.tickers.length === 0) {
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
      },
    });
  }
  onTabChange(): void {
    if (this.activeTab === 'Market') {
      this.loadTickers();
    }
  }





}
