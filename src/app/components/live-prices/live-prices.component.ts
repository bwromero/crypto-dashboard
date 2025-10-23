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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  heatmapData: HeatmapData = mockHeatmapData;
  fullCryptoData: CryptoData[] = mockCryptoData;

  get filteredData(): CryptoData[] {
    let filtered = this.fullCryptoData;

    if (this.searchQuery.trim()) {
      filtered = filtered.filter(
        (asset) =>
          asset.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get totalItems(): number {
    return this.filteredData.length;
  }

  get cryptoData(): CryptoData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get heatMapDataWithRows(): HeatmapData {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return {
      categories: this.heatmapData.categories,
      cryptos: this.heatmapData.cryptos.slice(startIndex, endIndex),
    };
  }

  get bubbleData(): CryptoData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get shouldShowLoadMore(): boolean {
    const totalItems = this.filteredData.length;
    const currentItemsShown = this.currentPage * this.itemsPerPage;
    return currentItemsShown < totalItems;
  }

  onNumOfRowsSelected(numOfRows: number) {
    this.itemsPerPage = numOfRows;
    this.currentPage = 1;
  }

  onSearchQueryChanged(searchQuery: string | Event) {
    this.searchQuery = searchQuery instanceof Event 
      ? (searchQuery.target as HTMLInputElement)?.value || ''
      : searchQuery || '';
    this.currentPage = 1;
  }

  onViewSelected(view: string) {
    this.selectedView = view as ViewType;
    this.currentPage = 1;
  }

  onPageChanged(page: number) {
    this.currentPage = page;
  }

  onLoadMore() {
    this.itemsPerPage += 10;
  }

  onRefresh() {
    this.currentPage = 1;
  }
}
