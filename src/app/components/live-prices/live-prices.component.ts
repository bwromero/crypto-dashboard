import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PriceTableComponent } from './price-table/price-table.component';
import { CommonModule } from '@angular/common';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { BubbleViewComponent } from './bubble-view/bubble-view.component';

enum ViewType {
  LIST = 'list',
  HEATMAP = 'heatmap',
  BUBBLES = 'bubbles',
}
@Component({
  selector: 'app-live-prices',
  standalone: true,
  imports: [ToolbarComponent, PriceTableComponent, HeatMapComponent, BubbleViewComponent, CommonModule],
  templateUrl: './live-prices.component.html',
  styles: ``,
})
export class LivePricesComponent {

  readonly views: ViewType[] = [ViewType.LIST, ViewType.HEATMAP, ViewType.BUBBLES];
  selectedView: ViewType = ViewType.LIST;

  onViewSelected(view: string) {
    this.selectedView = view as ViewType;
    console.log(this.selectedView);
  }
}
