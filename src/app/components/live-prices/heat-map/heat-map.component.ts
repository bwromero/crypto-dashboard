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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData, HeatmapData } from '../../models';
import * as d3 from 'd3';

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heat-map.component.html'
})
export class HeatMapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: HeatmapData = { categories: [], cryptos: [] };
  @Input() isLoading: boolean = false;
  @Output() cellClick = new EventEmitter<CryptoData>();

  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  private dimensions = { width: 1000, height: 600 };
  private resizeObs?: ResizeObserver;

  ngAfterViewInit(): void {
    this.updateDimensions();
    this.resizeObs = new ResizeObserver(() => {
      this.updateDimensions();
      this.renderTreemap();
    });
    this.resizeObs.observe(this.containerRef.nativeElement);
    this.renderTreemap();
  }

  ngOnDestroy(): void {
    this.resizeObs?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.containerRef) {
      this.renderTreemap();
    }
  }

  private updateDimensions() {
    const el = this.containerRef?.nativeElement;
    if (!el) return;

    const width = el.offsetWidth || 1000;
    const height = Math.max(500, Math.min(width * 0.6, 700));
    
    this.dimensions = { width, height };
  }

  private renderTreemap() {
    if (!this.data?.cryptos.length || !this.containerRef) return;

    const container = d3.select(this.containerRef.nativeElement);
    container.selectAll('*').remove();

    const maxMarketCap = Math.max(...this.data.cryptos.map(c => c.marketCap));

    const root = d3.hierarchy({
      name: 'root',
      children: this.data.cryptos.map(crypto => ({
        name: crypto.symbol,
        value: crypto.marketCap === maxMarketCap ? crypto.marketCap * 0.5 : crypto.marketCap,
        crypto: crypto
      }))
    })
    .sum(d => (d as any).value || 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0));

    const treemap = d3.treemap<any>()
      .size([this.dimensions.width, this.dimensions.height])
      .paddingInner(3)
      .paddingOuter(3)
      .round(true);

    treemap(root as any);

    const svg = container
      .append('svg')
      .attr('width', this.dimensions.width)
      .attr('height', this.dimensions.height)
      .attr('class', 'rounded-lg');

    const cells = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (d: any) => `translate(${d.x0},${d.y0})`);

    cells
      .append('rect')
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('fill', d => this.getColor((d.data as any).crypto.change24h))
      .attr('rx', 12)
      .attr('class', 'cursor-pointer transition-all duration-200 hover:brightness-110')
      .on('click', (event, d) => {
        this.cellClick.emit((d.data as any).crypto);
      });

    cells.each((d: any, i, nodes) => {
      const cell = d3.select(nodes[i]);
      const crypto = (d.data as any).crypto as CryptoData;
      const width = d.x1 - d.x0;
      const height = d.y1 - d.y0;
      const minDim = Math.min(width, height);

      if (minDim > 80) {
        cell.append('image')
          .attr('xlink:href', crypto.icon)
          .attr('x', width / 2 - 20)
          .attr('y', height / 2 - 40)
          .attr('width', 40)
          .attr('height', 40)
          .attr('clip-path', 'inset(0% round 8px)');

        cell.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2 + 15)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white font-bold')
          .attr('font-size', Math.min(20, minDim * 0.15))
          .text(crypto.symbol);

        cell.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2 + 35)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white/90 font-semibold')
          .attr('font-size', Math.min(16, minDim * 0.12))
          .text(this.formatPrice(crypto.price));

        cell.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2 + 52)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white/80')
          .attr('font-size', Math.min(14, minDim * 0.10))
          .text(this.formatChange(crypto.change24h));
      } else if (minDim > 50) {
        cell.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('class', 'fill-white font-bold')
          .attr('font-size', Math.min(16, minDim * 0.2))
          .text(crypto.symbol);

        cell.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2 + 18)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white/80')
          .attr('font-size', Math.min(12, minDim * 0.15))
          .text(this.formatChange(crypto.change24h));
      } else {
        cell.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('class', 'fill-white font-bold text-xs')
          .text(crypto.symbol);
      }
    });
  }

  private getColor(change: number): string {
    if (change >= 5) return '#10b981';
    if (change >= 2) return '#059669';
    if (change >= 0) return '#0d9488';
    if (change >= -2) return '#f43f5e';
    if (change >= -5) return '#e11d48';
    return '#dc2626';
  }

  private formatPrice(price: number): string {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  }

  private formatChange(change: number): string {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  }
}
