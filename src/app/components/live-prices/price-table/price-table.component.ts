import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../models';

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule],
  templateUrl: './price-table.component.html',
  styles: [`
  :host ::ng-deep {
    .mat-mdc-table {
      background-color: transparent;
    }

    .mat-mdc-header-row {
      border-bottom: 1px solid #242D39 !important;
    }
    
    .mat-mdc-row {
      border-bottom-width: 0 !important;
      border-color: transparent !important;
      gap: 3rem !important;
    }
    
    .mat-mdc-cell,
    .mat-mdc-header-cell {
      border-bottom-width: 0 !important;
    }
  }
`],
})
export class PriceTableComponent implements AfterViewInit, OnChanges {
  @Input() dataSource: CryptoData[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  matDataSource = new MatTableDataSource<CryptoData>([]);

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

  ngAfterViewInit() {
    this.matDataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.matDataSource.data = this.dataSource;
    }
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


