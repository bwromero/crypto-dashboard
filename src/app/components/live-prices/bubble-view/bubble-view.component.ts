import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../models';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

@Component({
  selector: 'app-bubble-view',
  standalone: true,
  imports: [CommonModule, BubbleChartComponent],
  templateUrl: './bubble-view.component.html',
  styles: ``
})
export class BubbleViewComponent {
  @Input() data: CryptoData[] = [];
  @Input() isLoading: boolean = false;
  @Output() bubbleClick = new EventEmitter<CryptoData>();

  onBubbleClick(asset: CryptoData): void {
    this.bubbleClick.emit(asset);
  }
}