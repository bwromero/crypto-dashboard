import { Component } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ActivityHistoryComponent } from '../activity-history/activity-history.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PortfolioComponent, ActivityHistoryComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
