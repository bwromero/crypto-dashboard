import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PriceTableComponent } from './price-table/price-table.component';
import { CommonModule } from '@angular/common';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { BubbleViewComponent } from './bubble-view/bubble-view.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { mockCryptoData, mockHeatmapData } from '../data/mock-crypto-data';
import { CryptoData, HeatmapData, ViewType } from '../models';
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
  searchQuery: string = '';
  heatmapData: HeatmapData = mockHeatmapData;
  fullCryptoData: CryptoData[] = mockCryptoData; 

  get cryptoData(): CryptoData[] {
    return this.fullCryptoData.slice(0, this.numOfRows);
  }

  get heatMapDataWithRows(): HeatmapData {
    return {
      categories: this.heatmapData.categories,  
      cryptos: this.heatmapData.cryptos.slice(0, this.numOfRows)  
    };
  }

  onNumOfRowsSelected(numOfRows: number) {
    this.numOfRows = numOfRows;
  }

  onSearchQueryChanged(searchQuery: string) {
    this.searchQuery = searchQuery;
    console.log(this.searchQuery);
  }

  onViewSelected(view: string) {
    this.selectedView = view as ViewType;
    console.log(this.selectedView);
  }
}
