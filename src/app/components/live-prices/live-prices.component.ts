import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PriceTableComponent } from './price-table/price-table.component';
import { ButtonConfig } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { BubbleViewComponent } from './bubble-view/bubble-view.component';

@Component({
  selector: 'app-live-prices',
  standalone: true,
  imports: [ToolbarComponent, PriceTableComponent, HeatMapComponent, BubbleViewComponent, CommonModule],
  templateUrl: './live-prices.component.html',
  styles: ``,
})
export class LivePricesComponent {

  readonly views: string[] = ['list', 'heatmap', 'bubbles'];

  selectedView: string = 'list';

  onViewSelected(view: any) {
    this.selectedView = view.name;
    console.log(this.selectedView);
  }
}
