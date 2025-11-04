import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';

interface Transaction {
  coin: {
    symbol: string;
    amount: number;
    type: string;
  };
  id: string;
  date: string;
  status: {
    text: string;
    color: string;
  };
  fees: string;
}

@Component({
  selector: 'app-activity-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-history.component.html',
  styles: ``
})
export class ActivityHistoryComponent implements OnInit {
  transactions: Transaction[] = [
    {
      coin: {
        symbol: 'btc',
        amount: 659.10,
        type: 'Withdraw USDT'
      },
      id: '#14525156',
      date: 'Mar 21, 2022',
      status: {
        text: 'Complited',
        color: '#0CAF60'
      },
      fees: '0.12000 BTC'
    },
    {
      coin: {
        symbol: 'usdt',
        amount: 659.10,
        type: 'Deposit BTC'
      },
      id: '#14525156',
      date: 'Mar 21, 2022',
      status: {
        text: 'Declined',
        color: '#FF5449'
      },
      fees: '0.12000 BTC'
    },
    {
      coin: {
        symbol: 'trx',
        amount: 659.10,
        type: 'Deposit BTC'
      },
      id: '#14525156',
      date: 'Mar 21, 2022',
      status: {
        text: 'Pending',
        color: '#FF8B3E'
      },
      fees: '0.12000 BTC'
    },
    {
      coin: {
        symbol: 'usdt',
        amount: 659.10,
        type: 'Withdraw USDT'
      },
      id: '#14525156',
      date: 'Mar 21, 2022',
      status: {
        text: 'Complited',
        color: '#0CAF60'
      },
      fees: '0.12000 BTC'
    }
  ];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    // If you want to fetch real-time data from CoinGecko API instead of using static images
    // this.transactions.forEach(transaction => {
    //   this.coingeckoService.getCoinData(transaction.coin.symbol)
    //     .subscribe(data => {
    //       transaction.coin.icon = data.image.small;
    //     });
    // });
  }

  // getCoinIcon(symbol: string): string {
  // }
}
