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
import { CryptoData } from '../../../shared/models';
import * as d3 from 'd3';

@Component({
    selector: 'app-d3-bubble-chart',
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
      .padding(4);

    pack(root);

    const svg = container
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'rounded-lg');

    const defs = svg.append('defs');

    root.leaves().forEach((d: any, i: number) => {
      const crypto = d.data as CryptoData;
      const isPositive = crypto.change24h >= 0;
      const gradientId = `bubble-gradient-${i}`;
      
      const gradient = defs.append('radialGradient')
        .attr('id', gradientId)
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%');
      
      if (isPositive) {
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', 'rgba(22, 29, 38, 0)')
          .attr('stop-opacity', 0);
        
        gradient.append('stop')
          .attr('offset', '30%')
          .attr('stop-color', 'rgb(0, 180, 100)')
          .attr('stop-opacity', 0.02);
        
        gradient.append('stop')
          .attr('offset', '50%')
          .attr('stop-color', 'rgb(0, 180, 100)')
          .attr('stop-opacity', 0.08);
        
        gradient.append('stop')
          .attr('offset', '70%')
          .attr('stop-color', 'rgb(0, 180, 100)')
          .attr('stop-opacity', 0.2);
        
        gradient.append('stop')
          .attr('offset', '85%')
          .attr('stop-color', 'rgb(0, 180, 100)')
          .attr('stop-opacity', 0.4);
        
        gradient.append('stop')
          .attr('offset', '95%')
          .attr('stop-color', 'rgb(0, 180, 100)')
          .attr('stop-opacity', 0.7);
        
        gradient.append('stop')
          .attr('offset', '98%')
          .attr('stop-color', 'rgb(0, 180, 100)')
          .attr('stop-opacity', 0.95);
        
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', 'rgb(0, 180, 100)')
          .attr('stop-opacity', 1);
      } else {
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', 'rgba(22, 29, 38, 0)')
          .attr('stop-opacity', 0);
        
        gradient.append('stop')
          .attr('offset', '30%')
          .attr('stop-color', 'rgb(180, 0, 0)')
          .attr('stop-opacity', 0.02);
        
        gradient.append('stop')
          .attr('offset', '50%')
          .attr('stop-color', 'rgb(180, 0, 0)')
          .attr('stop-opacity', 0.08);
        
        gradient.append('stop')
          .attr('offset', '70%')
          .attr('stop-color', 'rgb(180, 0, 0)')
          .attr('stop-opacity', 0.2);
        
        gradient.append('stop')
          .attr('offset', '85%')
          .attr('stop-color', 'rgb(180, 0, 0)')
          .attr('stop-opacity', 0.4);
        
        gradient.append('stop')
          .attr('offset', '95%')
          .attr('stop-color', 'rgb(180, 0, 0)')
          .attr('stop-opacity', 0.7);
        
        gradient.append('stop')
          .attr('offset', '98%')
          .attr('stop-color', 'rgb(180, 0, 0)')
          .attr('stop-opacity', 0.95);
        
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', 'rgb(180, 0, 0)')
          .attr('stop-opacity', 1);
      }
    });

    const nodes = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

    nodes
      .append('circle')
      .attr('r', (d: any) => d.r)
      .attr('fill', (d: any, i: number) => `url(#bubble-gradient-${i})`)
      .attr('class', 'cursor-pointer')
      .style('filter', (d: any) => {
        const crypto = d.data as CryptoData;
        const isPositive = crypto.change24h >= 0;
        return `drop-shadow(0 0 15px ${isPositive ? 'rgba(0, 255, 144, 0.3)' : 'rgba(255, 0, 0, 0.3)'})`;
      })
      .style('transition', 'all 0.3s ease')
      .on('mouseover', function(event, d: any) {
        const crypto = d.data as CryptoData;
        const isPositive = crypto.change24h >= 0;
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r', d.r * 1.1)
          .style('filter', `drop-shadow(0 0 30px ${isPositive ? 'rgba(0, 255, 144, 0.6)' : 'rgba(255, 0, 0, 0.6)'})`);
      })
      .on('mouseout', function(event, d: any) {
        const crypto = d.data as CryptoData;
        const isPositive = crypto.change24h >= 0;
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r', d.r)
          .style('filter', `drop-shadow(0 0 15px ${isPositive ? 'rgba(0, 255, 144, 0.3)' : 'rgba(255, 0, 0, 0.3)'})`);
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

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  }

  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  }
}

