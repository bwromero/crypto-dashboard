import { HeatmapData } from '../live-prices/heat-map/heat-map.component';
import { CryptoAsset } from '../live-prices/live-prices.component';

export type CryptoCategory =
  | 'store-of-value'
  | 'smart-contracts'
  | 'defi'
  | 'layer2';

// Mock cryptocurrency data
export const mockCryptoData: CryptoAsset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67234.5,
    change24h: 3.45,
    marketCap: 1316000000000,
    volume24h: 28500000000,
    categoryId: 'store-of-value',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    change24h: 5.23,
    marketCap: 415000000000,
    volume24h: 15200000000,
    categoryId: 'smart-contracts',
  },
  {
    id: '3',
    name: 'Tether',
    symbol: 'USDT',
    price: 1.0,
    change24h: 0.01,
    marketCap: 120000000000,
    volume24h: 45600000000,
    categoryId: 'store-of-value',
  },
  {
    id: '4',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 598.23,
    change24h: -2.34,
    marketCap: 89000000000,
    volume24h: 1200000000,
    categoryId: 'defi',
  },
  {
    id: '5',
    name: 'Solana',
    symbol: 'SOL',
    price: 154.32,
    change24h: 8.76,
    marketCap: 71000000000,
    volume24h: 8900000000,
    categoryId: 'smart-contracts',
  },
  {
    id: '6',
    name: 'Ripple',
    symbol: 'XRP',
    price: 0.5234,
    change24h: -1.23,
    marketCap: 29000000000,
    volume24h: 1100000000,
    categoryId: 'store-of-value',
  },
  {
    id: '7',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.4567,
    change24h: 2.11,
    marketCap: 16000000000,
    volume24h: 450000000,
    categoryId: 'smart-contracts',
  },
  {
    id: '8',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.1234,
    change24h: -4.56,
    marketCap: 17500000000,
    volume24h: 890000000,
    categoryId: 'defi',
  },
  {
    id: '9',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.8765,
    change24h: 6.43,
    marketCap: 8200000000,
    volume24h: 320000000,
    categoryId: 'layer2',
  },
  {
    id: '10',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.234,
    change24h: -3.21,
    marketCap: 10500000000,
    volume24h: 280000000,
    categoryId: 'layer2',
  },
  {
    id: '11',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 34.56,
    change24h: 4.32,
    marketCap: 13800000000,
    volume24h: 520000000,
    categoryId: 'layer2',
  },
  {
    id: '12',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.89,
    change24h: 1.87,
    marketCap: 8900000000,
    volume24h: 380000000,
    categoryId: 'defi',
  },
  {
    id: '13',
    name: 'Litecoin',
    symbol: 'LTC',
    price: 84.32,
    change24h: -0.98,
    marketCap: 6300000000,
    volume24h: 420000000,
    categoryId: 'store-of-value',
  },
  {
    id: '14',
    name: 'Uniswap',
    symbol: 'UNI',
    price: 8.567,
    change24h: 7.65,
    marketCap: 6500000000,
    volume24h: 180000000,
    categoryId: 'defi',
  },
  {
    id: '15',
    name: 'Cosmos',
    symbol: 'ATOM',
    price: 9.876,
    change24h: -2.45,
    marketCap: 3900000000,
    volume24h: 150000000,
    categoryId: 'layer2',
  },
  {
    id: '16',
    name: 'Stellar',
    symbol: 'XLM',
    price: 0.1123,
    change24h: 3.21,
    marketCap: 3200000000,
    volume24h: 95000000,
    categoryId: 'store-of-value',
  },
  {
    id: '17',
    name: 'VeChain',
    symbol: 'VET',
    price: 0.0234,
    change24h: -5.67,
    marketCap: 1700000000,
    volume24h: 65000000,
    categoryId: 'defi',
  },
  {
    id: '18',
    name: 'Filecoin',
    symbol: 'FIL',
    price: 5.432,
    change24h: 2.34,
    marketCap: 3100000000,
    volume24h: 125000000,
    categoryId: 'store-of-value',
  },
  {
    id: '19',
    name: 'TRON',
    symbol: 'TRX',
    price: 0.0987,
    change24h: -1.56,
    marketCap: 8700000000,
    volume24h: 340000000,
    categoryId: 'layer2',
  },
  {
    id: '20',
    name: 'Ethereum Classic',
    symbol: 'ETC',
    price: 23.45,
    change24h: 0.89,
    marketCap: 3400000000,
    volume24h: 180000000,
    categoryId: 'store-of-value',
  },
  {
    id: '21',
    name: 'Aptos',
    symbol: 'APT',
    price: 11.23,
    change24h: 9.87,
    marketCap: 4500000000,
    volume24h: 210000000,
    categoryId: 'layer2',
  },
  {
    id: '22',
    name: 'Arbitrum',
    symbol: 'ARB',
    price: 1.234,
    change24h: -6.54,
    marketCap: 2800000000,
    volume24h: 190000000,
    categoryId: 'layer2',
  },
  {
    id: '23',
    name: 'Optimism',
    symbol: 'OP',
    price: 2.345,
    change24h: 4.56,
    marketCap: 2300000000,
    volume24h: 85000000,
    categoryId: 'layer2',
  },
  {
    id: '24',
    name: 'Near Protocol',
    symbol: 'NEAR',
    price: 5.678,
    change24h: -3.45,
    marketCap: 6100000000,
    volume24h: 165000000,
    categoryId: 'layer2',
  },
];

export const mockHeatmapData: HeatmapData = {
  categories: [
    {
      id: 'store-of-value',
      name: 'Store Of Value',
      description: 'Digital assets that serve as stores of value',
    },
    {
      id: 'smart-contracts',
      name: 'Smart Contracts',
      description: 'Platforms supporting smart contract functionality',
    },
    {
      id: 'exchanges',
      name: 'Exchanges',
      description: 'Exchange tokens and DeFi protocols',
    },
    {
      id: 'meme',
      name: 'Meme',
      description: 'Meme coins and community-driven tokens',
    },
    {
      id: 'layer-1',
      name: 'Layer 1',
      description: 'Base layer blockchain protocols',
    },
    {
      id: 'defi',
      name: 'DeFi',
      description: 'Decentralized finance protocols',
    },
  ],
  cryptos: mockCryptoData,
};

// Function to generate random price changes (for refresh simulation)
export const generateRandomPriceChanges = (
  data: CryptoAsset[]
): CryptoAsset[] => {
  return data.map((asset) => ({
    ...asset,
    change24h: asset.change24h + (Math.random() - 0.5) * 2,
    price: asset.price * (1 + (Math.random() - 0.5) * 0.02),
    volume24h: asset.volume24h * (1 + (Math.random() - 0.5) * 0.1),
  }));
};

// Simulate API call with delay
export const fetchCryptoData = async (
  delay: number = 1500
): Promise<CryptoAsset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateRandomPriceChanges(mockCryptoData));
    }, delay);
  });
};
