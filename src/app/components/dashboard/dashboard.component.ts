import { Component } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ActivityHistoryComponent } from '../activity-history/activity-history.component';
import { BalanceWidgetComponent } from '../balance-widget/balance-widget.component';
@Component({
    selector: 'app-dashboard',
    imports: [PortfolioComponent, ActivityHistoryComponent, BalanceWidgetComponent],
    templateUrl: './dashboard.component.html',
    styles: ``
})
export class DashboardComponent {

}
