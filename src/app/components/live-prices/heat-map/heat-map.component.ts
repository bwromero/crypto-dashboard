import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';
import { CryptoData, HeatmapData } from '../../models/crypto.interface';
import { calculateTreemapBSP, TreemapNode } from '../../models/treemap-layout';

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './heat-map.component.html',
  styles: ``,
})
export class HeatMapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: HeatmapData = { categories: [], cryptos: [] };
  @Input() isLoading: boolean = false;
  @Output() cellClick = new EventEmitter<CryptoData>();

  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  protected icons = icons;

  dimensions = { width: 1000, height: 600 };
  nodes: TreemapNode[] = [];
  selectedId: string | null = null;

  private resizeObs?: ResizeObserver;

  ngAfterViewInit(): void {
    // Initial sizing
    this.updateDimensions();

    // Responsive sizing
    this.resizeObs = new ResizeObserver(() => this.updateDimensions());
    this.resizeObs.observe(this.containerRef.nativeElement);

    // Initial layout
    this.recalculateNodes();
  }

  ngOnDestroy(): void {
    this.resizeObs?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.containerRef) {
      this.recalculateNodes();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateDimensions();
  }

  private updateDimensions() {
    const el = this.containerRef?.nativeElement;
    if (!el) return;

    const width = el.offsetWidth || 1000;
    const height = Math.max(500, Math.min(width * 0.6, 700));
    const changed =
      width !== this.dimensions.width || height !== this.dimensions.height;

    if (changed) {
      this.dimensions = { width, height };
      this.recalculateNodes();
    }
  }

  private recalculateNodes() {
    if (!this.data?.cryptos.length) {
      this.nodes = [];
      return;
    }

    const treemapData = this.data.cryptos.map((a) => ({
      id: a.id,
      value: a.marketCap,
    }));
    this.nodes = calculateTreemapBSP(
      treemapData,
      this.dimensions.width,
      this.dimensions.height
    );
  }

  getCryptoById(id: string): CryptoData {
    return this.data.cryptos.find(a => a.id === id)!;
  }

  onCellClick(asset: CryptoData) {
    this.selectedId = asset.id;
    this.cellClick.emit(asset);
  }

  // Helpers (parity with your React utilities)
  getColorClass(change: number): string {
    if (change >= 5) return 'bg-emerald-500';
    if (change >= 2) return 'bg-emerald-600';
    if (change >= 0) return 'bg-teal-600';
    if (change >= -2) return 'bg-rose-500';
    if (change >= -5) return 'bg-rose-600';
    return 'bg-red-600';
  }

  formatPrice(price: number): string {
    if (price >= 1000)
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
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
