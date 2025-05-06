import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";
import { CryptoService } from '../../../services/crypto.service';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

interface PriceData {
  prices: [number, number][];  // Array of [timestamp, price] tuples
}

@Component({
  selector: 'app-portfolio-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './portfolio-chart.component.html'
})
export class PortfolioChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;
  private updateSubscription?: Subscription;
  private readonly coins = ['bitcoin', 'ethereum']; // Example coins

  constructor(private cryptoService: CryptoService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "area",
        height: 350,
        background: 'transparent',
        zoom: {
          enabled: true,
          type: 'x'
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ['#0CAF60', '#3B82F6'], // Green for Bitcoin, Blue for Ethereum
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.2,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#64748B'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#64748B'
          },
          formatter: (value) => { return '$' + value.toFixed(2) }
        }
      },
      grid: {
        borderColor: "#1E293B",
        strokeDashArray: 0,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      markers: {
        size: 0
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: '#64748B'
        }
      },
      title: {
        text: undefined
      },
      tooltip: {
        theme: 'dark',
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
          formatter: (value) => { return '$' + value.toFixed(2) }
        }
      }
    };
  }

  ngOnInit() {
    // Update every 5 minutes
    this.updateSubscription = interval(300000).pipe(
      startWith(0),
      switchMap(() => this.cryptoService.getMultiplePriceHistories(this.coins, 7))
    ).subscribe(priceMap => {
      this.updateChartData(priceMap);
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private updateChartData(priceMap: Map<string, PriceData>) {
    const series = [];
    
    for (const [coinId, data] of priceMap.entries()) {
      series.push({
        name: coinId.charAt(0).toUpperCase() + coinId.slice(1),
        data: data.prices.map(([timestamp, price]: [number, number]) => ({
          x: new Date(timestamp),
          y: price
        }))
      });
    }

    this.chartOptions.series = series;
    
    if (this.chart && this.chart.updateOptions) {
      this.chart.updateOptions({
        series: series
      });
    }
  }
}
