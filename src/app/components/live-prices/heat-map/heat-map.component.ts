import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CryptoData } from '../../models/crypto.interface';

export interface CryptoCategory {
  id: string;
  name: string;
  description: string;
}

export interface HeatmapData {
  categories: CryptoCategory[];
  cryptos: CryptoData[];
}


@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heat-map.component.html',
  styles: ``
})
export class HeatMapComponent {
  @Input() heatmapData: HeatmapData = {categories: [], cryptos: []};

  getCryptosByCategory(categoryId: string): CryptoData[] {
    return this.heatmapData.cryptos.filter(crypto => crypto.categoryId === categoryId);
  }

  getCryptoById(cryptoId: string): CryptoData[] | undefined {
    return this.heatmapData.cryptos.filter(crypto => crypto.id === cryptoId);
  }

  getSizeByMarketCap(marketCap: number): string {
    if (marketCap > 100000000000) return 'xlarge';      // > $100B
    if (marketCap > 10000000000) return 'large';        // > $10B  
    if (marketCap > 1000000000) return 'medium';        // > $1B
    return 'small';                                      // < $1B
  }

  getSizeClasses(size: string): string {
    switch(size) {
      case 'xlarge': return 'w-80 h-48';      // 320px x 192px
      case 'large':  return 'w-64 h-40';      // 256px x 160px
      case 'medium': return 'w-48 h-32';      // 192px x 128px
      case 'small':  return 'w-32 h-24';      // 128px x 96px
      default: return 'w-32 h-24';
    }
  }

  getColorClasses(color: string): string {
    return color === 'green' 
      ? 'bg-green-500 hover:bg-green-600' 
      : 'bg-red-500 hover:bg-red-600';
  }


  getResponsiveSizeClasses(size: string): string {
    switch(size) {
      case 'xlarge': return 'w-64 h-40 md:w-80 md:h-48';      // Responsive
      case 'large':  return 'w-48 h-32 md:w-64 md:h-40';
      case 'medium': return 'w-40 h-28 md:w-48 md:h-32';
      case 'small':  return 'w-28 h-20 md:w-32 md:h-24';
      default: return 'w-28 h-20 md:w-32 md:h-24';
    }
  }

  onCryptoClick(_t7: any) {
    throw new Error('Method not implemented.');
    }
}
