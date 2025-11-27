
export interface CryptoData {
    id: string;
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
    totalSupply?: number;
    chartData: number[];
    isFavorite: boolean;
    categoryId: string;
  }
  
  export interface CryptoCategory {
    id: string;
    name: string;
    description: string;
  }
  
  export interface HeatmapData {
    categories: CryptoCategory[];
    cryptos: CryptoData[];
  }

  export enum ViewType {
    LIST = 'list',
    HEATMAP = 'heatmap',
    BUBBLES = 'bubbles',
  }