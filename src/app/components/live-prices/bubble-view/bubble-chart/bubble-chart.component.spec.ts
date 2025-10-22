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

  it('should get asset by id', () => {
    const mockData = [
      { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 5, marketCap: 1000000000, volume24h: 100000000, circulatingSupply: 19000000, chartData: [], isFavorite: false, categoryId: 'store-of-value', rank: 1, icon: '', change7d: 10 }
    ];
    component.data = mockData;
    const asset = component.getAssetById('1');
    expect(asset).toEqual(mockData[0]);
  });

  it('should track by bubble id', () => {
    const mockBubble = { id: '1', x: 100, y: 100, radius: 50 };
    const result = component.trackByBubbleId(0, mockBubble);
    expect(result).toBe('1');
  });
});
