import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PriceTableComponent } from './price-table/price-table.component';
import { CommonModule } from '@angular/common';
import { HeatMapComponent, HeatmapData } from './heat-map/heat-map.component';
import { BubbleViewComponent } from './bubble-view/bubble-view.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { mockCryptoData, mockHeatmapData } from '../data/mock-crypto-data';

// TypeScript interfaces for type safety
export interface CryptoData {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  chartData: number[];
  isFavorite: boolean;
  categoryId: string;
}

enum ViewType {
  LIST = 'list',
  HEATMAP = 'heatmap',
  BUBBLES = 'bubbles',
}

@Component({
  selector: 'app-live-prices',
  standalone: true,
  imports: [ToolbarComponent, PriceTableComponent, HeatMapComponent, BubbleViewComponent, CommonModule, PaginatorComponent],
  templateUrl: './live-prices.component.html',
  styles: ``,
})
export class LivePricesComponent {

  readonly views: ViewType[] = [ViewType.LIST, ViewType.HEATMAP, ViewType.BUBBLES];
  selectedView: ViewType = ViewType.LIST;
  heatmapData: HeatmapData = mockHeatmapData;
  cryptoData: CryptoData[] = mockCryptoData;

  onViewSelected(view: string) {
    this.selectedView = view as ViewType;
    console.log(this.selectedView);
  }
}
