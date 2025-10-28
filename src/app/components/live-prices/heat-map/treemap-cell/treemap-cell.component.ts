import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreemapNode, CryptoData } from '../../../models';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';

@Component({
  selector: 'app-treemap-cell',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './treemap-cell.component.html',
  styles: `
    .cell-icon {
      width: clamp(24px, 3vw, 68px);  /* Reduced from 5vw to 4vw, max from 72px to 68px */
      height: auto;
      aspect-ratio: 1;
    }
    
    .cell-symbol {
      font-size: clamp(0.75rem, 2vw, 1.75rem);
    }
    
    .cell-price {
      font-size: clamp(0.625rem, 1.5vw, 1.25rem);
    }
    
    .cell-change {
      font-size: clamp(0.5rem, 1.2vw, 1rem);
    }
  `
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

  getCellSize(): 'large' | 'medium' | 'small' {
    const minDim = Math.min(this.node.width, this.node.height);
    if (minDim > 300) return 'large';
    if (minDim > 100) return 'medium';
    return 'small';
  }

  formatPrice(price: number): string {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  }

  formatChange(change: number): string {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  }
}
