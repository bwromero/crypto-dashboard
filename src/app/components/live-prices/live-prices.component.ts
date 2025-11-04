import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { BubbleViewComponent } from './bubble-view/bubble-view.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { mockCryptoData, mockHeatmapData } from '../shared/data/mock-crypto-data';
import { CryptoData, HeatmapData, ViewType } from '../shared/models';
import { CryptoService } from '../../services/crypto.service';
import { Subscription, interval } from 'rxjs';
import { PriceTableComponent } from './price-table/price-table.component';
@Component({
    selector: 'app-live-prices',
    imports: [
        ToolbarComponent,
        HeatMapComponent,
        BubbleViewComponent,
        CommonModule,
        PaginatorComponent,
        PriceTableComponent,
    ],
    templateUrl: './live-prices.component.html',
    styles: ``
})
export class LivePricesComponent implements OnInit, OnDestroy {
  readonly ViewType = ViewType;
  selectedView: ViewType = ViewType.LIST;
  numOfRows: number = 10;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  isRefreshing: boolean = false;
  isLoading: boolean = false;
  useRealData: boolean = true; // Toggle between real and mock data
  
  heatmapData: HeatmapData = mockHeatmapData;
  fullCryptoData: CryptoData[] = mockCryptoData;
  
  private refreshSubscription?: Subscription;
  private autoRefreshInterval = 30000; // 30 seconds

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    if (this.useRealData) {
      this.loadRealData();
      this.startAutoRefresh();
    }
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private loadRealData() {
    this.isLoading = true;
    this.cryptoService.getMarketData(1, 100).subscribe({
      next: (data) => {
        this.fullCryptoData = data;
        this.heatmapData = {
          categories: this.heatmapData.categories,
          cryptos: this.fullCryptoData,
        };
        this.isLoading = false;
        this.isRefreshing = false;
        console.log('Real crypto data loaded:', data.length, 'coins');
      },
      error: (error) => {
        console.error('Error loading real data, falling back to mock data:', error);
        this.fullCryptoData = mockCryptoData;
        this.isLoading = false;
        this.isRefreshing = false;
      }
    });
  }

  private startAutoRefresh() {
    this.refreshSubscription = interval(this.autoRefreshInterval).subscribe(() => {
      if (this.useRealData && !this.isRefreshing) {
        this.loadRealData();
      }
    });
  }

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
    this.isRefreshing = true;
    this.currentPage = 1;
    this.searchQuery = '';
    
    if (this.useRealData) {
      this.loadRealData();
      // The isRefreshing will be set to false in loadRealData
    } else {
      // For mock data, just simulate a delay
      setTimeout(() => {
        this.isRefreshing = false;
        console.log('Mock data refreshed - page reset to 1, search cleared');
      }, 1000);
    }
  }
}
