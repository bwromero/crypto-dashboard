import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PortfolioAsset {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-balance-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance-widget.component.html',
})
export class BalanceWidgetComponent {
  // Main balance properties
  totalBalance: number = 69300;
  btcAmount: number = 0.0140;

  // Portfolio assets data
  portfolioAssets: PortfolioAsset[] = [
    { name: 'Bitcoin', amount: 1920, percentage: 35, color: '#F59E0B' }, // Orange
    { name: 'Waves', amount: 250, percentage: 5, color: '#8B5CF6' },    // Purple
    { name: 'Avax', amount: 26, percentage: 50, color: '#EF4444' },     // Red
    { name: 'Bitcoin', amount: 920, percentage: 10, color: '#10B981' }  // Green
  ];

  // Format currency values
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  }

  // Calculate the arc path for the gauge segments
  calculateArcPath(percentage: number, index: number): string {
    // Get the starting angle based on previous segments
    const startAngle = this.getStartAngle(index);
    // Calculate the end angle based on the current percentage
    const endAngle = startAngle + (percentage / 100) * Math.PI;
    
    // SVG arc parameters
    const radius = 40;
    const centerX = 50;
    const centerY = 50;
    
    // Calculate start and end points
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    // Determine if we need to use the large arc flag
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    // Return the SVG path string
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  }

  // Helper function to calculate starting angle for each segment
  private getStartAngle(index: number): number {
    let totalPercentage = 0;
    for (let i = 0; i < index; i++) {
      totalPercentage += this.portfolioAssets[i].percentage;
    }
    return (totalPercentage / 100) * Math.PI;
  }

  // Calculate stroke dash array for percentage circles
  calculateStrokeDashArray(percentage: number): string {
    const circumference = 2 * Math.PI * 14; // r=14 from the circle in template
    const dashLength = (percentage / 100) * circumference;
    return `${dashLength} ${circumference}`;
  }
}
