import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BubbleViewComponent } from './bubble-view.component';

describe('BubbleViewComponent', () => {
  let component: BubbleViewComponent;
  let fixture: ComponentFixture<BubbleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle search change', () => {
    component.onSearchChange('bitcoin');
    expect(component.searchQuery).toBe('bitcoin');
  });

  it('should handle row limit change', () => {
    component.onRowLimitChange('20');
    expect(component.rowLimit).toBe('20');
  });

  it('should handle view mode change', () => {
    component.onViewModeChange('list');
    expect(component.viewMode).toBe('list');
  });

  it('should handle bubble click', () => {
    const mockAsset = { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 5, marketCap: 1000000000, volume24h: 100000000, circulatingSupply: 19000000, chartData: [], isFavorite: false, categoryId: 'store-of-value', rank: 1, icon: '', change7d: 10 };
    component.onBubbleClick(mockAsset);
    expect(component.selectedAsset).toBe(mockAsset);
    expect(component.isPanelOpen).toBe(true);
  });

  it('should handle page change', () => {
    component.onPageChange(3);
    expect(component.currentPage).toBe(3);
  });
});