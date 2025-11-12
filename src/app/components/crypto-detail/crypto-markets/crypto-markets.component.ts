import { Component } from '@angular/core';
import { Scan, LucideAngularModule, ArrowRight } from 'lucide-angular';
@Component({
  selector: 'app-crypto-markets',
  imports: [LucideAngularModule],
  templateUrl: './crypto-markets.component.html',
  styles: ``
})
export class CryptoMarketsComponent {
  readonly scan = Scan;
  readonly arrowRight  = ArrowRight;

}
