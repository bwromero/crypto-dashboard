import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../models';

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-table.component.html',
  styles: []
})
export class PriceTableComponent {
  @Input() dataSource: CryptoData[] = [];
  
  sortColumn: keyof CryptoData | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

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
