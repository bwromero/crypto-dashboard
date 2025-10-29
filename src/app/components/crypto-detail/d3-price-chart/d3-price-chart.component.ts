import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

export interface PricePoint {
  timestamp: number;
  price: number;
}

@Component({
  selector: 'app-d3-price-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #container class="w-full h-full"></div>`
})
export class D3PriceChartComponent implements AfterViewInit, OnChanges {
  @Input() data: PricePoint[] = [];
  @Input() width: number = 800;
  @Input() height: number = 400;
  @Input() color: string = '#00C087';

  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (this.width > 0 && this.height > 0) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['width'] || changes['height']) {
      if (this.containerRef && this.width > 0 && this.height > 0) {
        this.renderChart();
      }
    }
  }

  private renderChart(): void {
    if (!this.data?.length || !this.containerRef) return;

    const container = d3.select(this.containerRef.nativeElement);
    container.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 60 };
    const chartWidth = this.width - margin.left - margin.right;
    const chartHeight = this.height - margin.top - margin.bottom;

    const svg = container
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'rounded-lg');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime()
      .domain(d3.extent(this.data, d => new Date(d.timestamp)) as [Date, Date])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(this.data, d => d.price)! * 0.995,
        d3.max(this.data, d => d.price)! * 1.005
      ])
      .range([chartHeight, 0]);

    const line = d3.line<PricePoint>()
      .x(d => xScale(new Date(d.timestamp)))
      .y(d => yScale(d.price))
      .curve(d3.curveMonotoneX);

    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', this.color)
      .attr('stop-opacity', 0.3);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', this.color)
      .attr('stop-opacity', 0);

    const area = d3.area<PricePoint>()
      .x(d => xScale(new Date(d.timestamp)))
      .y0(chartHeight)
      .y1(d => yScale(d.price))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(this.data)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', area);

    g.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', this.color)
      .attr('stroke-width', 2)
      .attr('d', line);

    const xAxis = d3.axisBottom(xScale)
      .ticks(6)
      .tickFormat(d => {
        const date = d as Date;
        return d3.timeFormat('%b %d')(date);
      });

    const yAxis = d3.axisLeft(yScale)
      .ticks(6)
      .tickFormat(d => `$${d3.format(',.0f')(d as number)}`);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)
      .attr('class', 'text-secondary text-xs')
      .selectAll('text')
      .style('fill', '#8B93A7');

    g.selectAll('.domain, .tick line')
      .style('stroke', '#1E2A38');

    g.append('g')
      .call(yAxis)
      .attr('class', 'text-secondary text-xs')
      .selectAll('text')
      .style('fill', '#8B93A7');

    const focus = g.append('g')
      .style('display', 'none');

    focus.append('circle')
      .attr('r', 5)
      .attr('fill', this.color)
      .attr('stroke', '#0f1823')
      .attr('stroke-width', 2);

    focus.append('line')
      .attr('class', 'tooltip-line-x')
      .attr('stroke', '#4B5563')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    const tooltip = container
      .append('div')
      .style('position', 'absolute')
      .style('display', 'none')
      .style('background-color', '#0f1823')
      .style('border', '1px solid #1E2A38')
      .style('border-radius', '8px')
      .style('padding', '8px 12px')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('color', '#E2E8F0');

    svg.append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => {
        focus.style('display', null);
        tooltip.style('display', 'block');
      })
      .on('mouseout', () => {
        focus.style('display', 'none');
        tooltip.style('display', 'none');
      })
      .on('mousemove', (event) => {
        const [mouseX] = d3.pointer(event);
        const x0 = xScale.invert(mouseX - margin.left);
        const bisect = d3.bisector((d: PricePoint) => new Date(d.timestamp)).left;
        const index = bisect(this.data, x0);
        const d = this.data[index];

        if (d) {
          focus.attr('transform', `translate(${xScale(new Date(d.timestamp))},${yScale(d.price)})`);
          focus.select('.tooltip-line-x')
            .attr('y1', 0)
            .attr('y2', chartHeight - yScale(d.price));

          tooltip
            .html(`
              <div style="font-weight: 600; margin-bottom: 4px;">$${d3.format(',.2f')(d.price)}</div>
              <div style="color: #8B93A7;">${d3.timeFormat('%b %d, %Y')(new Date(d.timestamp))}</div>
            `)
            .style('left', `${event.pageX - this.containerRef.nativeElement.offsetLeft + 10}px`)
            .style('top', `${event.pageY - this.containerRef.nativeElement.offsetTop - 40}px`);
        }
      });
  }
}

