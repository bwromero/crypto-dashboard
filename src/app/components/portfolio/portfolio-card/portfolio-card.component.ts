import { Component, Input } from '@angular/core';
import { PortfolioItem } from '../../../models/interfaces/portfolio-item';

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-card.component.html',
  styles: ``
})
export class PortfolioCardComponent {

  @Input() portfolioItem!: PortfolioItem;

}
