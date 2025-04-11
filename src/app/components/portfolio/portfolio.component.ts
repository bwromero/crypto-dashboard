import { Component } from '@angular/core';
import { PortfolioItem } from '../../models/interfaces/portfolio-item';
import { PortfolioCardComponent } from './portfolio-card/portfolio-card.component';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [PortfolioCardComponent],
  templateUrl: './portfolio.component.html',
  styles: ``
})
export class PortfolioComponent {

  portfolioItems: PortfolioItem[] = [
    {
      amount: 1000,
      currency: 'USD',
      accountName: 'Account 1'
    },
    {
      amount: 2000,
      currency: 'USD',
      accountName: 'Account 2'  
    },
    {
      amount: 3000,
      currency: 'USD',
      accountName: 'Account 3'
    },
    {
      amount: 4000,
      currency: 'USD',
      accountName: 'Account 3'
    }
  ];
}
