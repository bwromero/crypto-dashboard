import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../../models';
import { D3BubbleChartComponent } from './d3-bubble-chart/d3-bubble-chart.component';

@Component({
  selector: 'app-bubble-view',
  standalone: true,
  imports: [CommonModule, D3BubbleChartComponent],
  templateUrl: './bubble-view.component.html'
})
export class BubbleViewComponent implements AfterViewInit, OnDestroy {
  @Input() data: CryptoData[] = [];
  @Input() isLoading: boolean = false;
  @Output() bubbleClick = new EventEmitter<CryptoData>();

  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  dimensions = { width: 0, height: 0 };
  private resizeObs?: ResizeObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.updateDimensions(), 0);
    this.resizeObs = new ResizeObserver(() => {
      this.ngZone.run(() => {
        this.updateDimensions();
        this.cdr.detectChanges();
      });
    });
    this.resizeObs.observe(this.containerRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObs?.disconnect();
  }

  private updateDimensions() {
    const el = this.containerRef?.nativeElement;
    if (!el) return;

    this.dimensions = {
      width: el.clientWidth,
      height: el.clientHeight
    };
  }

  onBubbleClick(crypto: CryptoData) {
    this.bubbleClick.emit(crypto);
  }
}
