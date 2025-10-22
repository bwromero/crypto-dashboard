import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BubbleChartComponent } from './bubble-chart.component';

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit bubble click', () => {
    spyOn(component.bubbleClick, 'emit');
    const mockAsset = { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 5, marketCap: 1000000000, volume24h: 100000000, circulatingSupply: 19000000, chartData: [], isFavorite: false, categoryId: 'store-of-value', rank: 1, icon: '', change7d: 10 };
    component.onBubbleClick(mockAsset);
    expect(component.bubbleClick.emit).toHaveBeenCalledWith(mockAsset);
  });

  it('should format change correctly', () => {
    expect(component.formatChange(5.5)).toBe('+5.5%');
    expect(component.formatChange(-3.2)).toBe('-3.2%');
  });

  it('should get crypto color', () => {
    expect(component.getCryptoColor('BTC')).toBe('#F7931A');
    expect(component.getCryptoColor('UNKNOWN')).toBe('#6B7280');
  });
});
