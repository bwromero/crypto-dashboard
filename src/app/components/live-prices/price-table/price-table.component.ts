import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './price-table.component.html',
  styles: ``
})
export class PriceTableComponent {
  @Input() dataSource: CryptoData[] = MOCK_CRYPTO_DATA;
  
  displayedColumns: string[] = [
    'rank', 'coin', 'price', 'change24h', 'change7d', 
    'marketCap', 'volume24h', 'supply', 'chart', 'actions', 'favorite'
  ];

  getChartPoints(data: number[]): string {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * 64;
      const y = 32 - ((value - min) / range) * 32;
      return `${x},${y}`;
    }).join(' ');
  }

  toggleFavorite(element: CryptoData) {
    element.isFavorite = !element.isFavorite;
  }
}

export interface CryptoData {
  rank: number;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  chartData: number[];
  isFavorite: boolean;
}

export const MOCK_CRYPTO_DATA: CryptoData[] = [
  {
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    price: 38755.12,
    change24h: 3.36,
    change7d: -2.15,
    marketCap: 390600000000,
    volume24h: 66300000000,
    circulatingSupply: 19087425,
    chartData: [35000, 36000, 38000, 38755],
    isFavorite: false,
  },
  {
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    price: 1128.71,
    change24h: -0.01,
    change7d: 5.23,
    marketCap: 142400000000,
    volume24h: 26000000000,
    circulatingSupply: 121448183,
    chartData: [1000, 1050, 1100, 1128],
    isFavorite: true,
  },
  {
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    price: 1.0,
    change24h: 0.01,
    change7d: 0.02,
    marketCap: 89000000000,
    volume24h: 45000000000,
    circulatingSupply: 89000000000,
    chartData: [0.99, 1.0, 1.0, 1.0],
    isFavorite: true,
  },
  {
    rank: 4,
    name: 'BNB',
    symbol: 'BNB',
    icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    price: 245.67,
    change24h: 1.45,
    change7d: -3.21,
    marketCap: 38000000000,
    volume24h: 1200000000,
    circulatingSupply: 154000000,
    chartData: [250, 240, 245, 245],
    isFavorite: false,
  },
  {
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    price: 98.45,
    change24h: 4.12,
    change7d: 8.76,
    marketCap: 42000000000,
    volume24h: 3200000000,
    circulatingSupply: 426000000,
    chartData: [85, 90, 95, 98],
    isFavorite: false,
  },
  {
    rank: 6,
    name: 'XRP',
    symbol: 'XRP',
    icon: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    price: 0.6234,
    change24h: -2.15,
    change7d: 1.23,
    marketCap: 35000000000,
    volume24h: 1800000000,
    circulatingSupply: 56000000000,
    chartData: [0.6, 0.62, 0.63, 0.62],
    isFavorite: false,
  },
  {
    rank: 7,
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    price: 1.0,
    change24h: 0.0,
    change7d: 0.01,
    marketCap: 28000000000,
    volume24h: 8500000000,
    circulatingSupply: 28000000000,
    chartData: [1.0, 1.0, 1.0, 1.0],
    isFavorite: false,
  },
  {
    rank: 8,
    name: 'Cardano',
    symbol: 'ADA',
    icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    price: 0.4567,
    change24h: 2.34,
    change7d: -1.45,
    marketCap: 16000000000,
    volume24h: 450000000,
    circulatingSupply: 35000000000,
    chartData: [0.44, 0.45, 0.46, 0.46],
    isFavorite: false,
  },
  {
    rank: 9,
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
    price: 0.08234,
    change24h: 5.67,
    change7d: 12.34,
    marketCap: 12000000000,
    volume24h: 890000000,
    circulatingSupply: 145000000000,
    chartData: [0.075, 0.078, 0.08, 0.082],
    isFavorite: false,
  },
  {
    rank: 10,
    name: 'Polygon',
    symbol: 'MATIC',
    icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    price: 0.8234,
    change24h: -1.23,
    change7d: 3.45,
    marketCap: 7800000000,
    volume24h: 320000000,
    circulatingSupply: 9500000000,
    chartData: [0.8, 0.82, 0.83, 0.82],
    isFavorite: false,
  },
];
