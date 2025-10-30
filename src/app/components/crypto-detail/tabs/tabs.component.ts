import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { CryptoData } from '../../shared/models';
import { PricePoint } from '../d3-price-chart/d3-price-chart.component';
import { CoinGeckoDetailData, CoinGeckoTicker } from '../../../services/crypto.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [TabComponent],
  templateUrl: './tabs.component.html',
  styles: ``
})
export class TabsComponent {
  @Input() tabs: string[] = [];
  @Input() activeTab: string = '';
  @Input() cryptoData!: CryptoData;
  @Input() selectedTimeframe: string = 'ALL';
  @Input() chartData: PricePoint[] = [];
  @Input() volumeData: PricePoint[] = [];
  @Input() marketCapData: PricePoint[] = [];
  @Input() tickers: CoinGeckoTicker[] = [];
  @Input() cryptoDetail!: CoinGeckoDetailData;
  @Input() isLoadingTickers: boolean = false;
  @Output() activeTabChange = new EventEmitter<string>();
  @Output() changeTimeframe = new EventEmitter<string>();
  changeTab(tab: string): void {
    this.activeTabChange.emit(tab);
  }
}
