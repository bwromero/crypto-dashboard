import { Component } from '@angular/core';
import { PortfolioCardComponent } from './portfolio-card/portfolio-card.component';
import { AccountType, PortfolioItem } from '../models/portfolio.interface';
import { PortfolioChartComponent } from './portfolio-chart/portfolio-chart.component';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [PortfolioCardComponent, PortfolioChartComponent],
  templateUrl: './portfolio.component.html',
  styles: ``
})
export class PortfolioComponent {

  portfolioItems: PortfolioItem[] = [
    {
      amount: 1000,
      currency: 'USD',
      accountType: AccountType.MAIN
    },
    {
      amount: 2000,
      currency: 'USD',
      accountType: AccountType.TRADING
    },
    {
      amount: 3000,
      currency: 'USD',
      accountType: AccountType.MARGIN
    },
    {
      amount: 4000,
      currency: 'USD',
      accountType: AccountType.FUTURES
    }
  ];
}
