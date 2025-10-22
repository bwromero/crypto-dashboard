import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData, HeatmapData } from '../../models/crypto.interface';
import { calculateTreemapBSP, TreemapNode } from '../../models/treemap-layout';
import { TreemapCellComponent } from './treemap-cell/treemap-cell.component';

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [CommonModule, TreemapCellComponent],
  templateUrl: './heat-map.component.html',
  styles: ``,
})
export class HeatMapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: HeatmapData = { categories: [], cryptos: [] };
  @Input() isLoading: boolean = false;
  @Output() cellClick = new EventEmitter<CryptoData>();

  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  dimensions = { width: 1000, height: 600 };
  nodes: TreemapNode[] = [];
  selectedId: string | null = null;

  private resizeObs?: ResizeObserver;

  ngAfterViewInit(): void {
    this.updateDimensions();
    this.resizeObs = new ResizeObserver(() => this.updateDimensions());
    this.resizeObs.observe(this.containerRef.nativeElement);
    this.recalculateNodes();
  }

  ngOnDestroy(): void {
    this.resizeObs?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.containerRef) {
      this.recalculateNodes();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateDimensions();
  }

  private updateDimensions() {
    const el = this.containerRef?.nativeElement;
    if (!el) return;

    const width = el.offsetWidth || 1000;
    const height = Math.max(500, Math.min(width * 0.6, 700));
    const changed = width !== this.dimensions.width || height !== this.dimensions.height;

    if (changed) {
      this.dimensions = { width, height };
      this.recalculateNodes();
    }
  }

  private recalculateNodes() {
    if (!this.data?.cryptos.length) {
      this.nodes = [];
      return;
    }
    const treemapData = this.data.cryptos.map(a => ({ id: a.id, value: a.marketCap }));
    this.nodes = calculateTreemapBSP(treemapData, this.dimensions.width, this.dimensions.height);
  }

  getAssetById(id: string): CryptoData | undefined {
    return this.data.cryptos.find(a => a.id === id);
  }

  onCellClicked(asset: CryptoData) {
    this.selectedId = asset.id;
    this.cellClick.emit(asset);
  }
}