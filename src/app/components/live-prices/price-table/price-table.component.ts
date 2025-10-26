import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../models';
import { LucideAngularModule, icons } from 'lucide-angular';

interface TableColumn {
  key: keyof CryptoData | null;
  label: string;
  sortable: boolean;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './price-table.component.html',
  styles: []
})
export class PriceTableComponent {
  @Input() dataSource: CryptoData[] = [];
  protected chevronsUpDown = icons.ChevronsUpDown;
  protected chevronUp = icons.ChevronUp;
  protected chevronDown = icons.ChevronDown;
  sortColumn: keyof CryptoData | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  columns: TableColumn[] = [
    { key: 'rank', label: '#', sortable: false, align: 'left' },
    { key: 'name', label: 'Coin', sortable: true, align: 'left' },
    { key: 'price', label: 'Price', sortable: true, align: 'left' },
    { key: 'change24h', label: '24h %', sortable: true, align: 'center' },
    { key: 'change7d', label: '7d %', sortable: true, align: 'left' },
    { key: 'marketCap', label: 'Market Cap', sortable: true, align: 'left' },
    { key: 'volume24h', label: 'Volume (24h)', sortable: true, align: 'left' },
    { key: 'circulatingSupply', label: 'Circulating Supply', sortable: true, align: 'left' },
    { key: null, label: 'Last 90 Days', sortable: false, align: 'left' },
    { key: null, label: '', sortable: false, align: 'left' },
    { key: null, label: '', sortable: false, align: 'left' },
  ];

  sort(column: keyof CryptoData) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  get sortedData(): CryptoData[] {
    if (!this.sortColumn) {
      return this.dataSource;
    }

    return [...this.dataSource].sort((a, b) => {
      const aVal = a[this.sortColumn as keyof CryptoData];
      const bVal = b[this.sortColumn as keyof CryptoData];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return this.sortDirection === 'asc' 
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }

  getChartPoints(data: number[]): string {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 64;
        const y = 32 - ((value - min) / range) * 32;
        return `${x},${y}`;
      })
      .join(' ');
  }

  toggleFavorite(element: CryptoData) {
    element.isFavorite = !element.isFavorite;
  }
}
