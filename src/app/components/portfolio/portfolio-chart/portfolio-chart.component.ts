import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-portfolio-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './portfolio-chart.component.html'
})
export class PortfolioChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [{
        name: "Portfolio Value",
        data: [800, 840, 820, 880, 840, 880, 830, 800, 830]
      }],
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
      colors: ['#0CAF60'], // Your green color
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
        categories: [
          '2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04',
          '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08'
        ],
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
          formatter: (value) => { return '$' + value }
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
        show: false
      },
      title: {
        text: undefined
      },
      tooltip: {
        theme: 'dark',
        x: {
          format: 'dd MMM yyyy'
        }
      }
    };
  }
}
