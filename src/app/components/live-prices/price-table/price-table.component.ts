import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../models';

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './price-table.component.html',
  styles: [`
  :host ::ng-deep {
    .mat-mdc-table {
      background-color: transparent;
    }
    
    .mat-mdc-row,
    .mat-mdc-header-row {
      border-bottom-width: 0 !important;
      border-color: transparent !important;
    }
    
    .mat-mdc-cell,
    .mat-mdc-header-cell {
      border-bottom-width: 0 !important;
    }
  }
`],
})
export class PriceTableComponent {
  @Input() dataSource: CryptoData[] = [];

  displayedColumns: string[] = [
    'rank',
    'coin',
    'price',
    'change24h',
    'change7d',
    'marketCap',
    'volume24h',
    'supply',
    'chart',
    'actions',
    'favorite',
  ];

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


