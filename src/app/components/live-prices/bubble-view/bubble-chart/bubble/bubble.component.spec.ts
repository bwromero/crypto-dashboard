import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BubbleComponent } from './bubble.component';
import { CryptoData } from '../../../../models/crypto.interface';
import { BubbleNode } from '../../../../models/bubble-layout';

describe('BubbleComponent', () => {
  let component: BubbleComponent;
  let fixture: ComponentFixture<BubbleComponent>;

  const mockAsset: CryptoData = {
    id: '1',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '',
    price: 50000,
    change24h: 5.5,
    change7d: 10,
    marketCap: 1000000000,
    volume24h: 100000000,
    circulatingSupply: 19000000,
    chartData: [],
    isFavorite: false,
    categoryId: 'store-of-value'
  };

  const mockNode: BubbleNode = {
    id: '1',
    x: 100,
    y: 100,
    radius: 50
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleComponent);
    component = fixture.componentInstance;
    component.node = mockNode;
    component.asset = mockAsset;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit bubble click', () => {
    spyOn(component.bubbleClick, 'emit');
    component.onBubbleClick();
    expect(component.bubbleClick.emit).toHaveBeenCalledWith(mockAsset);
  });

  it('should format change correctly', () => {
    expect(component.formatChange(5.5)).toBe('+5.5%');
    expect(component.formatChange(-3.2)).toBe('-3.2%');
  });

  it('should get bubble style', () => {
    const style = component.getBubbleStyle();
    expect(style.left).toBe('100px');
    expect(style.top).toBe('100px');
    expect(style.width).toBe('100px');
    expect(style.height).toBe('100px');
  });
});
