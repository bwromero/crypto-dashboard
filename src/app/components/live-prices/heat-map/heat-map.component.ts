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
import { CryptoData, HeatmapData } from '../../shared/models';
import { D3TreemapComponent } from './d3-treemap/d3-treemap.component';

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [CommonModule, D3TreemapComponent],
  templateUrl: './heat-map.component.html'
})
export class HeatMapComponent implements AfterViewInit, OnDestroy {
  @Input() data: HeatmapData = { categories: [], cryptos: [] };
  @Input() isLoading: boolean = false;
  @Output() cellClick = new EventEmitter<CryptoData>();

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

  onCellClick(crypto: CryptoData) {
    this.cellClick.emit(crypto);
  }
}
