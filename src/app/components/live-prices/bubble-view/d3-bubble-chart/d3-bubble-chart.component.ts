import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../../models';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-bubble-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #container class="w-full h-full"></div>`
})
export class D3BubbleChartComponent implements AfterViewInit, OnChanges {
  @Input() data: CryptoData[] = [];
  @Input() width: number = 1000;
  @Input() height: number = 600;
  @Output() bubbleClick = new EventEmitter<CryptoData>();

  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (this.width > 0 && this.height > 0) {
      this.renderBubbleChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['width'] || changes['height']) {
      if (this.containerRef && this.width > 0 && this.height > 0) {
        this.renderBubbleChart();
      }
    }
  }

  private renderBubbleChart() {
    if (!this.data?.length || !this.containerRef) return;

    const container = d3.select(this.containerRef.nativeElement);
    container.selectAll('*').remove();

    const root = d3.hierarchy({ children: this.data })
      .sum(d => Math.abs((d as any).change24h || 1))
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const pack = d3.pack<any>()
      .size([this.width, this.height])
      .padding(3);

    pack(root);

    const svg = container
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'rounded-lg');

    const nodes = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

    nodes
      .append('circle')
      .attr('r', (d: any) => d.r)
      .attr('fill', (d: any) => this.getColor((d.data as CryptoData).change24h))
      .attr('stroke', '#1E293B')
      .attr('stroke-width', 2)
      .attr('class', 'cursor-pointer transition-all duration-200')
      .style('filter', 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))')
      .on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 3)
          .style('filter', 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5))');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 2)
          .style('filter', 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))');
      })
      .on('click', (event, d: any) => {
        this.bubbleClick.emit(d.data as CryptoData);
      });

    nodes.each((d: any, i, nodes) => {
      const node = d3.select(nodes[i]);
      const crypto = d.data as CryptoData;
      const radius = d.r;

      if (radius > 40) {
        node.append('image')
          .attr('xlink:href', crypto.icon)
          .attr('x', -radius * 0.3)
          .attr('y', -radius * 0.5)
          .attr('width', radius * 0.6)
          .attr('height', radius * 0.6)
          .attr('clip-path', 'inset(0% round 50%)');

        node.append('text')
          .attr('y', radius * 0.2)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white font-bold')
          .attr('font-size', Math.min(18, radius * 0.35))
          .text(crypto.symbol);

        node.append('text')
          .attr('y', radius * 0.45)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white/90 font-semibold')
          .attr('font-size', Math.min(14, radius * 0.28))
          .text(this.formatPrice(crypto.price));

        node.append('text')
          .attr('y', radius * 0.65)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white/80')
          .attr('font-size', Math.min(12, radius * 0.24))
          .text(this.formatChange(crypto.change24h));
      } else if (radius > 25) {
        node.append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('class', 'fill-white font-bold')
          .attr('font-size', Math.min(14, radius * 0.4))
          .text(crypto.symbol);

        node.append('text')
          .attr('y', radius * 0.35)
          .attr('text-anchor', 'middle')
          .attr('class', 'fill-white/80 text-xs')
          .attr('font-size', Math.min(10, radius * 0.3))
          .text(this.formatChange(crypto.change24h));
      } else if (radius > 15) {
        node.append('text')
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
    if (price >= 1000) return `$${(price / 1000).toFixed(1)}K`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  }

  private formatChange(change: number): string {
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  }
}

