import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioItem, AccountType } from '../../models/portfolio.interface';

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-card.component.html',
  styles: ``
})
export class PortfolioCardComponent {

  @Input() portfolioItem!: PortfolioItem;

  getStatusColor(accountType: AccountType): string {
    switch (accountType) {
      case AccountType.MAIN:
      case AccountType.TRADING:
        return 'bg-green-500'; // or your custom green color class
      case AccountType.MARGIN:
        return 'bg-orange-500'; // or your custom orange color class
      case AccountType.FUTURES:
        return 'bg-red-500'; // or your custom red color class
      default:
        return 'bg-green-500'; // default color
    }
  }

}
