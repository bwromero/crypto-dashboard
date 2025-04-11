import { Component } from '@angular/core';
import { LayoutComponent } from '../../layout/layout.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent, PortfolioComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
