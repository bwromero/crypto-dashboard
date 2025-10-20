import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PriceTableComponent } from './price-table/price-table.component';

@Component({
  selector: 'app-live-prices',
  standalone: true,
  imports: [ToolbarComponent, PriceTableComponent],
  templateUrl: './live-prices.component.html',
  styles: ``,
})
export class LivePricesComponent {}
