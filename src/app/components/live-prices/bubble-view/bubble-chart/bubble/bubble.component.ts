import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleNode, CryptoData } from '../../../../models';

@Component({
  selector: 'app-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bubble.component.html',
  styles: ``
})
export class BubbleComponent {
  @Input() node!: BubbleNode;
  @Input() asset!: CryptoData;
  @Input() isSelected: boolean = false;
  @Output() bubbleClick = new EventEmitter<CryptoData>();

  onBubbleClick() {
    this.bubbleClick.emit(this.asset);
  }

  onBubbleHover(event: Event, isHovered: boolean): void {
    const target = event.target as HTMLElement;
    if (target) {
      target.style.filter = isHovered ? 'brightness(1.15)' : 'brightness(1)';
    }
  }

  getBubbleStyle(): any {
    return {
      left: this.node.x + 'px',
      top: this.node.y + 'px',
      width: (this.node.radius * 2) + 'px',
      height: (this.node.radius * 2) + 'px',
      transform: 'translate(-50%, -50%)'
    };
  }

  getBubbleBackgroundStyle(): any {
    const bgColor = this.getBackgroundColor(this.asset.change24h);
    
    return {
      background: `radial-gradient(circle at center, transparent 0%, rgba(${bgColor}, 0.15) 40%, rgba(${bgColor}, 0.5) 70%, rgba(${bgColor}, 0.8) 100%)`,
      boxShadow: `0 0 0 2px rgba(${bgColor}, 0.2), 0 8px 30px rgba(${bgColor}, 0.35), 0 4px 15px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(${bgColor}, 0.15)`
    };
  }

  getBubbleRingStyle(): any {
    const bgColor = this.getBackgroundColor(this.asset.change24h);
    
    return {
      background: `radial-gradient(circle at center, transparent 55%, rgba(${bgColor}, 0.6) 75%, rgba(${bgColor}, 0.9) 90%, rgba(${bgColor}, 0.7) 100%)`
    };
  }

  getIconStyle(): any {
    const iconColor = this.getCryptoColor(this.asset.symbol);
    
    return {
      width: this.node.radius > 60 ? '36px' : '28px',
      height: this.node.radius > 60 ? '36px' : '28px',
      background: `linear-gradient(135deg, ${iconColor}, ${iconColor}dd)`,
      fontSize: this.node.radius > 60 ? '15px' : '11px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    };
  }

  getSymbolStyle(): any {
    return {
      fontSize: this.node.radius > 60 ? '19px' : this.node.radius > 40 ? '15px' : '12px',
      lineHeight: 1,
      marginBottom: this.node.radius > 40 ? '4px' : '2px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
    };
  }

  getChangeStyle(): any {
    return {
      fontSize: this.node.radius > 60 ? '16px' : this.node.radius > 40 ? '13px' : '11px',
      lineHeight: 1,
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
    };
  }

  getBorderStyle(): any {
    const bgColor = this.getBackgroundColor(this.asset.change24h);
    
    return {
      border: `2px solid rgba(${bgColor}, 0.4)`,
      boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -2px 4px rgba(0, 0, 0, 0.15)'
    };
  }

  private getCryptoColor(symbol: string): string {
    const colors: Record<string, string> = {
      'BTC': '#F7931A', 'ETH': '#627EEA', 'BNB': '#F3BA2F', 'SOL': '#9945FF',
      'ADA': '#0033AD', 'DOT': '#E6007A', 'AVAX': '#E84142', 'MATIC': '#8247E5',
      'LINK': '#2A5ADA', 'UNI': '#FF007A', 'ATOM': '#2E3148', 'LTC': '#345D9D',
      'BCH': '#8DC351', 'XRP': '#23292F', 'DOGE': '#C2A633',
    };
    return colors[symbol] || '#6B7280';
  }

  private getBackgroundColor(change: number): string {
    if (change >= 5) return '16, 185, 129'; // Emerald
    if (change >= 2) return '34, 197, 94'; // Green
    if (change > 0) return '74, 222, 128'; // Light green
    if (change > -2) return '248, 113, 113'; // Light red
    if (change > -5) return '239, 68, 68'; // Red
    return '220, 38, 38'; // Dark red
  }

  formatChange(change: number): string {
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  }
}
