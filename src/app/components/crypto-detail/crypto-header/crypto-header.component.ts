import { Component, Input } from '@angular/core';
import { CoinGeckoDetailData } from '../../../services/crypto.service';
import { CryptoData } from '../../models';
import { DecimalPipe } from '@angular/common';
import { LucideAngularModule, Info, Star } from 'lucide-angular';

@Component({
  selector: 'app-crypto-header',
  standalone: true,
  imports: [DecimalPipe, LucideAngularModule],
  templateUrl: './crypto-header.component.html',
  styles: ``
})
export class CryptoHeaderComponent {
  @Input() cryptoDetail: CoinGeckoDetailData | null = null;
  @Input() crypto?: CryptoData | null = null;

  readonly Info = Info;
  readonly Star = Star;
}
