import { Component } from '@angular/core';

export interface CryptoCategory {
  id: string;
  name: string;
  description: string;
}

export interface HeatmapCryptoData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  categoryId: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  color: 'green' | 'red';
}

export interface HeatmapData {
  categories: CryptoCategory[];
  cryptos: HeatmapCryptoData[];
}

export const HEATMAP_MOCK_DATA: HeatmapData = {
  categories: [
    { id: 'store-of-value', name: 'Store Of Value', description: 'Digital assets that serve as stores of value' },
    { id: 'smart-contracts', name: 'Smart Contracts', description: 'Platforms supporting smart contract functionality' },
    { id: 'exchanges', name: 'Exchanges', description: 'Exchange tokens and DeFi protocols' },
    { id: 'meme', name: 'Meme', description: 'Meme coins and community-driven tokens' },
    { id: 'layer-1', name: 'Layer 1', description: 'Base layer blockchain protocols' },
    { id: 'defi', name: 'DeFi', description: 'Decentralized finance protocols' }
  ],

  cryptos: [
    // Store Of Value
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
      price: 38755.12,
      change24h: 3.36,
      marketCap: 390600000000,
      volume24h: 66300000000,
      categoryId: 'store-of-value',
      size: 'xlarge',
      color: 'red'
    },

    // Smart Contracts
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      price: 2128.71,
      change24h: 5.23,
      marketCap: 142400000000,
      volume24h: 26000000000,
      categoryId: 'smart-contracts',
      size: 'xlarge',
      color: 'green'
    },
    {
      id: 'bnb',
      name: 'BNB',
      symbol: 'BNB',
      icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
      price: 245.67,
      change24h: -1.45,
      marketCap: 38000000000,
      volume24h: 1200000000,
      categoryId: 'smart-contracts',
      size: 'large',
      color: 'red'
    },
    {
      id: 'ada',
      name: 'Cardano',
      symbol: 'ADA',
      icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
      price: 0.4567,
      change24h: 2.34,
      marketCap: 16000000000,
      volume24h: 450000000,
      categoryId: 'smart-contracts',
      size: 'medium',
      color: 'red'
    },
    {
      id: 'avax',
      name: 'Avalanche',
      symbol: 'AVAX',
      icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
      price: 12.45,
      change24h: -2.15,
      marketCap: 4500000000,
      volume24h: 320000000,
      categoryId: 'smart-contracts',
      size: 'medium',
      color: 'red'
    },
    {
      id: 'etc',
      name: 'Ethereum Classic',
      symbol: 'ETC',
      icon: 'https://assets.coingecko.com/coins/images/453/small/ethereum-classic-logo.png',
      price: 18.23,
      change24h: 1.87,
      marketCap: 2800000000,
      volume24h: 180000000,
      categoryId: 'smart-contracts',
      size: 'small',
      color: 'red'
    },
    {
      id: 'link',
      name: 'Chainlink',
      symbol: 'LINK',
      icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
      price: 6.78,
      change24h: 4.12,
      marketCap: 3800000000,
      volume24h: 250000000,
      categoryId: 'smart-contracts',
      size: 'medium',
      color: 'red'
    },
    {
      id: 'xlm',
      name: 'Stellar',
      symbol: 'XLM',
      icon: 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
      price: 0.1234,
      change24h: -0.89,
      marketCap: 3500000000,
      volume24h: 120000000,
      categoryId: 'smart-contracts',
      size: 'small',
      color: 'red'
    },
    {
      id: 'algo',
      name: 'Algorand',
      symbol: 'ALGO',
      icon: 'https://assets.coingecko.com/coins/images/4380/small/download.png',
      price: 0.0891,
      change24h: 2.67,
      marketCap: 1200000000,
      volume24h: 45000000,
      categoryId: 'smart-contracts',
      size: 'small',
      color: 'red'
    },
    {
      id: 'eos',
      name: 'EOS',
      symbol: 'EOS',
      icon: 'https://assets.coingecko.com/coins/images/738/small/eos-eos-logo.png',
      price: 0.5678,
      change24h: -1.23,
      marketCap: 650000000,
      volume24h: 32000000,
      categoryId: 'smart-contracts',
      size: 'small',
      color: 'red'
    },
    {
      id: 'vet',
      name: 'VeChain',
      symbol: 'VET',
      icon: 'https://assets.coingecko.com/coins/images/1167/small/VeChain-Logo-768x725.png',
      price: 0.0234,
      change24h: 3.45,
      marketCap: 1700000000,
      volume24h: 85000000,
      categoryId: 'smart-contracts',
      size: 'small',
      color: 'red'
    },

    // Exchanges
    {
      id: 'wbtc',
      name: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
      price: 38755.12,
      change24h: 3.36,
      marketCap: 8500000000,
      volume24h: 1200000000,
      categoryId: 'exchanges',
      size: 'large',
      color: 'green'
    },
    {
      id: 'uni',
      name: 'Uniswap',
      symbol: 'UNI',
      icon: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
      price: 4.56,
      change24h: 2.34,
      marketCap: 3200000000,
      volume24h: 180000000,
      categoryId: 'exchanges',
      size: 'medium',
      color: 'green'
    },

    // Meme
    {
      id: 'doge',
      name: 'Dogecoin',
      symbol: 'DOGE',
      icon: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
      price: 0.08234,
      change24h: 5.67,
      marketCap: 12000000000,
      volume24h: 890000000,
      categoryId: 'meme',
      size: 'large',
      color: 'green'
    },
    {
      id: 'shib',
      name: 'Shiba Inu',
      symbol: 'SHIB',
      icon: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
      price: 0.00000891,
      change24h: 8.23,
      marketCap: 5200000000,
      volume24h: 450000000,
      categoryId: 'meme',
      size: 'medium',
      color: 'green'
    }
  ]
};

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [],
  templateUrl: './heat-map.component.html',
  styles: ``
})
export class HeatMapComponent {
  heatmapData = HEATMAP_MOCK_DATA;
  
  getCryptosByCategory(categoryId: string): HeatmapCryptoData[] {
    return this.heatmapData.cryptos.filter(crypto => crypto.categoryId === categoryId);
  }
  
  getCategoryById(categoryId: string): CryptoCategory | undefined {
    return this.heatmapData.categories.find(cat => cat.id === categoryId);
  }

  getSizeByMarketCap(marketCap: number): string {
    if (marketCap > 100000000000) return 'xlarge';      // > $100B
    if (marketCap > 10000000000) return 'large';        // > $10B  
    if (marketCap > 1000000000) return 'medium';        // > $1B
    return 'small';                                      // < $1B
  }
}
