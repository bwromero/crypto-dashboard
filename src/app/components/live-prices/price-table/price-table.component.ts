import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../models';
import { LucideAngularModule, icons } from 'lucide-angular';
import {
  priceTableColumns,
  TableColumn,
  SortDirection,
} from '../../models/price-table-layout';

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './price-table.component.html',
  styles: [],
})
export class PriceTableComponent {
  @Input() dataSource: CryptoData[] = [];
  protected chevronsUpDown = icons.ChevronsUpDown;
  protected chevronUp = icons.ChevronUp;
  protected chevronDown = icons.ChevronDown;
  protected readonly SortDirection = SortDirection;
  sortColumn: keyof CryptoData | '' = '';
  sortDirection: SortDirection = SortDirection.ASC;

  columns: TableColumn[] = priceTableColumns;

  sort(column: keyof CryptoData) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    } else {
      this.sortColumn = column;
      this.sortDirection = SortDirection.ASC;
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
        return this.sortDirection === SortDirection.ASC ? aVal - bVal : bVal - aVal;
      }

      return this.sortDirection === SortDirection.ASC
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
