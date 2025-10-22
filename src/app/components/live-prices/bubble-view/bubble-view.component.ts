import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CryptoData } from '../../models/crypto.interface';
import { fetchCryptoData } from '../../data/mock-crypto-data';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { LucideAngularModule, icons } from 'lucide-angular';

@Component({
  selector: 'app-bubble-view',
  standalone: true,
  imports: [
    CommonModule,
    BubbleChartComponent,
    LucideAngularModule
],
  templateUrl: './bubble-view.component.html',
  styles: ``
})
export class BubbleViewComponent implements OnInit, OnDestroy {
  protected icons = icons;

  // State management
  private cryptoDataSubject = new BehaviorSubject<CryptoData[]>([]);
  private searchSubject = new BehaviorSubject<string>('');
  private rowLimitSubject = new BehaviorSubject<string>('10');
  
  cryptoData$ = this.cryptoDataSubject.asObservable();
  filteredData$ = this.cryptoDataSubject.pipe(
    map(data => this.filterData(data, this.searchSubject.value, this.rowLimitSubject.value))
  );

  isLoading = true;
  selectedAsset: CryptoData | null = null;
  isPanelOpen = false;
  searchQuery = '';
  rowLimit = '10';
  viewMode: 'bubble' | 'list' = 'bubble';
  currentPage = 2;
  lastUpdated = '1 min 48s ago';

  private subscriptions: Subscription[] = [];
  private refreshInterval?: Subscription;

  ngOnInit(): void {
    this.loadData();
    
    // Auto-refresh every 30 seconds
    this.refreshInterval = interval(30000).subscribe(() => {
      this.loadData();
    });

    // Setup search filtering
    this.subscriptions.push(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        this.updateFilteredData();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.refreshInterval?.unsubscribe();
  }

  private async loadData(): Promise<void> {
    try {
      const data = await fetchCryptoData(this.isLoading ? 1500 : 500);
      this.cryptoDataSubject.next(data);
      this.lastUpdated = 'Just now';
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private filterData(data: CryptoData[], search: string, limit: string): CryptoData[] {
    let filtered = data;
    
    if (search) {
      filtered = filtered.filter(asset => 
        asset.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const limitNum = parseInt(limit);
    return filtered.slice(0, limitNum);
  }

  private updateFilteredData(): void {
    // Trigger filteredData$ update
    this.cryptoDataSubject.next(this.cryptoDataSubject.value);
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  onRowLimitChange(value: string): void {
    this.rowLimit = value;
    this.rowLimitSubject.next(value);
  }

  onViewModeChange(mode: 'bubble' | 'list'): void {
    this.viewMode = mode;
  }

  onBubbleClick(asset: CryptoData): void {
    this.selectedAsset = asset;
    this.isPanelOpen = true;
  }

  onClosePanel(): void {
    this.isPanelOpen = false;
    setTimeout(() => this.selectedAsset = null, 200);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onLoadMore(): void {
    this.loadData();
  }

  onRefresh(): void {
    this.loadData();
  }
}