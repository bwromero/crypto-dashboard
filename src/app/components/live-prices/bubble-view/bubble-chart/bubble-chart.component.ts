import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../../models/crypto.interface';
import { calculateBubblePack, BubbleNode } from '../../../models/bubble-layout';
import { BubbleComponent } from './bubble/bubble.component';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [CommonModule, BubbleComponent],
  templateUrl: './bubble-chart.component.html',
  styles: ``
})
export class BubbleChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: CryptoData[] = [];
  @Input() isLoading: boolean = false;
  @Output() bubbleClick = new EventEmitter<CryptoData>();

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

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

  getAssetById(id: string): CryptoData | undefined {
    return this.data.find(asset => asset.id === id);
  }

  trackByBubbleId(index: number, bubble: BubbleNode): string {
    return bubble.id;
  }
}
