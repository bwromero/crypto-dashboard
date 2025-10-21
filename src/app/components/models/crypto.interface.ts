
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
    chartData: number[];
    isFavorite: boolean;
    categoryId: string;
  }
  