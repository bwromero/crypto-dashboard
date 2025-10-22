import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';
import { CryptoData } from '../../../models/crypto.interface';
import { calculateBubblePack, BubbleNode } from '../../../models/bubble-layout';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './bubble-chart.component.html',
  styles: ``
})
export class BubbleChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: CryptoData[] = [];
  @Input() isLoading: boolean = false;
  @Output() bubbleClick = new EventEmitter<CryptoData>();

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  protected icons = icons;

  dimensions = { width: 1000, height: 600 };
  bubbles: BubbleNode[] = [];
  private resizeObs?: ResizeObserver;

  ngAfterViewInit(): void {
    this.updateDimensions();
    this.resizeObs = new ResizeObserver(() => this.updateDimensions());
    this.resizeObs.observe(this.containerRef.nativeElement);
    this.recalculateBubbles();
  }

  ngOnDestroy(): void {
    this.resizeObs?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.containerRef) {
      this.recalculateBubbles();
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
    const height = Math.max(500, Math.min(width * 0.65, 700));
    const changed = width !== this.dimensions.width || height !== this.dimensions.height;

    if (changed) {
      this.dimensions = { width, height };
      this.recalculateBubbles();
    }
  }

  private recalculateBubbles() {
    if (!this.data?.length) {
      this.bubbles = [];
      return;
    }

    const bubbleData = this.data.map(asset => ({
      id: asset.id,
      value: asset.marketCap,
    }));
    
    this.bubbles = calculateBubblePack(
      bubbleData,
      this.dimensions.width,
      this.dimensions.height,
      35,
      85
    );
  }

  onBubbleClick(asset: CryptoData) {
    this.bubbleClick.emit(asset);
  }

  getCryptoColor(symbol: string): string {
    const colors: Record<string, string> = {
      'BTC': '#F7931A', 'ETH': '#627EEA', 'BNB': '#F3BA2F', 'SOL': '#9945FF',
      'ADA': '#0033AD', 'DOT': '#E6007A', 'AVAX': '#E84142', 'MATIC': '#8247E5',
      'LINK': '#2A5ADA', 'UNI': '#FF007A', 'ATOM': '#2E3148', 'LTC': '#345D9D',
      'BCH': '#8DC351', 'XRP': '#23292F', 'DOGE': '#C2A633',
    };
    return colors[symbol] || '#6B7280';
  }

  getBackgroundColor(change: number): string {
    if (change >= 5) return '16, 185, 129'; // Emerald
    if (change >= 2) return '34, 197, 94'; // Green
    if (change > 0) return '74, 222, 128'; // Light green
    if (change > -2) return '248, 113, 113'; // Light red
    if (change > -5) return '239, 68, 68'; // Red
    return '220, 38, 38'; // Dark red
  }

  formatChange(change: number): string {
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  }

  getAssetById(id: string): CryptoData | undefined {
    return this.data.find(asset => asset.id === id);
  }

  trackByBubbleId(index: number, bubble: BubbleNode): string {
    return bubble.id;
  }

  onBubbleHover(event: Event, isHovered: boolean): void {
    const target = event.target as HTMLElement;
    if (target) {
      target.style.filter = isHovered ? 'brightness(1.15)' : 'brightness(1)';
    }
  }

  getBubbleStyle(bubble: BubbleNode): any {
    return {
      left: bubble.x + 'px',
      top: bubble.y + 'px',
      width: (bubble.radius * 2) + 'px',
      height: (bubble.radius * 2) + 'px',
      transform: 'translate(-50%, -50%)'
    };
  }

  getBubbleBackgroundStyle(bubble: BubbleNode): any {
    const asset = this.getAssetById(bubble.id);
    const bgColor = this.getBackgroundColor(asset?.change24h || 0);
    
    return {
      background: `radial-gradient(circle at center, transparent 0%, rgba(${bgColor}, 0.15) 40%, rgba(${bgColor}, 0.5) 70%, rgba(${bgColor}, 0.8) 100%)`,
      boxShadow: `0 0 0 2px rgba(${bgColor}, 0.2), 0 8px 30px rgba(${bgColor}, 0.35), 0 4px 15px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(${bgColor}, 0.15)`
    };
  }

  getBubbleRingStyle(bubble: BubbleNode): any {
    const asset = this.getAssetById(bubble.id);
    const bgColor = this.getBackgroundColor(asset?.change24h || 0);
    
    return {
      background: `radial-gradient(circle at center, transparent 55%, rgba(${bgColor}, 0.6) 75%, rgba(${bgColor}, 0.9) 90%, rgba(${bgColor}, 0.7) 100%)`
    };
  }

  getIconStyle(bubble: BubbleNode, asset: CryptoData): any {
    const iconColor = this.getCryptoColor(asset.symbol);
    
    return {
      width: bubble.radius > 60 ? '36px' : '28px',
      height: bubble.radius > 60 ? '36px' : '28px',
      background: `linear-gradient(135deg, ${iconColor}, ${iconColor}dd)`,
      fontSize: bubble.radius > 60 ? '15px' : '11px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    };
  }

  getSymbolStyle(bubble: BubbleNode): any {
    return {
      fontSize: bubble.radius > 60 ? '19px' : bubble.radius > 40 ? '15px' : '12px',
      lineHeight: 1,
      marginBottom: bubble.radius > 40 ? '4px' : '2px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
    };
  }

  getChangeStyle(bubble: BubbleNode): any {
    return {
      fontSize: bubble.radius > 60 ? '16px' : bubble.radius > 40 ? '13px' : '11px',
      lineHeight: 1,
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
    };
  }

  getBorderStyle(bubble: BubbleNode): any {
    const asset = this.getAssetById(bubble.id);
    const bgColor = this.getBackgroundColor(asset?.change24h || 0);
    
    return {
      border: `2px solid rgba(${bgColor}, 0.4)`,
      boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -2px 4px rgba(0, 0, 0, 0.15)'
    };
  }
}
