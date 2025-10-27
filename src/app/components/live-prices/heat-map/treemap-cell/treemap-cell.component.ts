import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreemapNode, CryptoData } from '../../../models';
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

  getCellSize(): 'large' | 'medium' | 'small' {
    const minDim = Math.min(this.node.width, this.node.height);
    if (minDim > 200) return 'large';
    if (minDim > 100) return 'medium';
    return 'small';
  }

  getCryptoIconSize(node: TreemapNode): string {
    const minDim = Math.min(node.width, node.height);
    if (minDim > 200) return 'w-16 h-16';     // 64px - large cells
    if (minDim > 100) return 'w-10 h-10';     // 40px - medium cells
    return 'w-6 h-6';                         // 24px - small cells
  }

  getSymbolTextSize(node: TreemapNode): string {
    const minDim = Math.min(node.width, node.height);
    if (minDim > 200) return 'text-4xl';      // large cells
    if (minDim > 100) return 'text-xl';       // medium cells
    return 'text-sm';                         // small cells
  }

  getPriceTextSize(node: TreemapNode): string {
    const minDim = Math.min(node.width, node.height);
    if (minDim > 200) return 'text-3xl';      // large cells
    if (minDim > 100) return 'text-lg';       // medium cells
    return 'text-xs';                         // small cells
  }

  getChangeTextSize(node: TreemapNode): string {
    const minDim = Math.min(node.width, node.height);
    if (minDim > 200) return 'text-2xl';      // large cells
    if (minDim > 100) return 'text-base';     // medium cells
    return 'text-xs';                         // small cells
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
