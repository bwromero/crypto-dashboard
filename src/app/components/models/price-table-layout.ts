import { CryptoData } from './crypto.interface';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface TableColumn {
  key: keyof CryptoData | null;
  label: string;
  sortable: boolean;
  align?: 'left' | 'center' | 'right';
}

export const priceTableColumns: TableColumn[] = [
  { key: 'rank', label: '#', sortable: false, align: 'left' },
  { key: 'name', label: 'Coin', sortable: true, align: 'left' },
  { key: 'price', label: 'Price', sortable: true, align: 'left' },
  { key: 'change24h', label: '24h %', sortable: true, align: 'center' },
  { key: 'change7d', label: '7d %', sortable: true, align: 'left' },
  { key: 'marketCap', label: 'Market Cap', sortable: true, align: 'left' },
  { key: 'volume24h', label: 'Volume (24h)', sortable: true, align: 'left' },
  {
    key: 'circulatingSupply',
    label: 'Circulating Supply',
    sortable: true,
    align: 'left',
  },
  { key: null, label: 'Last 90 Days', sortable: false, align: 'left' },
  { key: null, label: '', sortable: false, align: 'left' },
  { key: null, label: '', sortable: false, align: 'left' },
];
