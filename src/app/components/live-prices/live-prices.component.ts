import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PriceTableComponent } from './price-table/price-table.component';
import { CommonModule } from '@angular/common';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { BubbleViewComponent } from './bubble-view/bubble-view.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { mockCryptoData, mockHeatmapData } from '../data/mock-crypto-data';
import { CryptoData, HeatmapData, ViewType } from '../models';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-live-prices',
  standalone: true,
  imports: [
    ToolbarComponent,
    PriceTableComponent,
    HeatMapComponent,
    BubbleViewComponent,
    CommonModule,
    PaginatorComponent,
  ],
  templateUrl: './live-prices.component.html',
  styles: ``,
})
export class LivePricesComponent {
  readonly ViewType = ViewType;
  selectedView: ViewType = ViewType.LIST;
  numOfRows: number = 10;
  heatmapData: HeatmapData = mockHeatmapData;
  fullCryptoData: CryptoData[] = mockCryptoData; // Keep full data

  // Computed property - no need to re-slice
  get cryptoData(): CryptoData[] {
    return this.fullCryptoData.slice(0, this.numOfRows);
  }

  onNumOfRowsSelected(numOfRows: number) {
    this.numOfRows = numOfRows;
    // No need to call initCryptoData() - computed property handles it
  }

  onViewSelected(view: string) {
    this.selectedView = view as ViewType;
    console.log(this.selectedView);
  }
}
