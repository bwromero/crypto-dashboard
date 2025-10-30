import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CryptoData } from '../../../shared/models';
import {
  D3PriceChartComponent,
  PricePoint,
} from '../../d3-price-chart/d3-price-chart.component';
import {
  CoinGeckoDetailData,
  CoinGeckoTicker,
} from '../../../../services/crypto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [D3PriceChartComponent, CommonModule],
  templateUrl: './tab.component.html',
  styles: ``,
})
export class TabComponent {
  @Input() cryptoData!: CryptoData;
  @Input() tabTitle: string = '';
  @Input() selectedTimeframe: string = 'ALL';
  @Input() chartData: PricePoint[] = [];
  @Input() volumeData: PricePoint[] = [];
  @Input() marketCapData: PricePoint[] = [];
  @Input() tickers: CoinGeckoTicker[] = [];
  @Input() cryptoDetail!: CoinGeckoDetailData;
  @Input() isLoadingTickers: boolean = false;
  @Output() changeTimeframeEvent = new EventEmitter<string>();
  @Output() activeTabChangeEvent = new EventEmitter<string>();

  changeTimeframe(timeframe: string): void {
    this.changeTimeframeEvent.emit(timeframe);
  }
  changeTab(tab: string): void {
    this.activeTabChangeEvent.emit(tab);
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
    return (
      platforms['ethereum'] ||
      platforms['binance-smart-chain'] ||
      platforms['polygon-pos'] ||
      null
    );
  }

  getTrustScoreColor(trustScore: string): string {
    if (trustScore === 'green') return 'bg-action';
    if (trustScore === 'yellow') return 'bg-yellow-500';
    return 'bg-slate-600';
  }

  shortenAddress(address: string): string {
    if (address.length <= 16) return address;
    return `${address.slice(0, 6)}...${address.slice(-8)}`;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Address copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }

  getDescription(): string {
    if (!this.cryptoDetail?.description?.en) return 'No description available.';
    const fullDesc = this.cryptoDetail.description.en;
    const plainText = fullDesc.replace(/<[^>]*>/g, '');
    return plainText.length > 500
      ? plainText.substring(0, 500) + '...'
      : plainText;
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
          change: previous
            ? ((current.price - previous.price) / previous.price) * 100
            : 0,
        });
      }
    }

    return result;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
