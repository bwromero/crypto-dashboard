import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreemapNode } from '../../../models/treemap-layout';
import { CryptoData } from '../../../models/crypto.interface';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';

@Component({
  selector: 'app-treemap-cell',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './treemap-cell.component.html',
  styles: ``
})
export class TreemapCellComponent {
  @Input() node!: TreemapNode;
  @Input() asset!: CryptoData;
  @Input() selected: boolean = false;
  @Output() clicked = new EventEmitter<CryptoData>();

  protected icons = icons;

  onClick() {
    this.clicked.emit(this.asset);
  }

  getColorClass(change: number): string {
    if (change >= 5) return 'bg-emerald-500';
    if (change >= 2) return 'bg-emerald-600';
    if (change >= 0) return 'bg-teal-600';
    if (change >= -2) return 'bg-rose-500';
    if (change >= -5) return 'bg-rose-600';
    return 'bg-red-600';
  }

  formatPrice(price: number): string {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  }

  formatChange(change: number): string {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  }

  getIconBg(symbol: string): string {
    const map: Record<string, string> = {
      BTC: '#F7931A',
      ETH: '#627EEA',
      BNB: '#F3BA2F',
      SOL: '#14F195',
      ADA: '#0033AD',
      DOT: '#E6007A',
      AVAX: '#E84142',
      MATIC: '#8247E5',
      LINK: '#2A5ADA',
    };
    return map[symbol] || '#6B7280';
  }
}
