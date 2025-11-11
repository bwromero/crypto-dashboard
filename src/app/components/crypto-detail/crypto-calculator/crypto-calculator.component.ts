import { Component } from '@angular/core';
import { Calculator, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-crypto-calculator',
  imports: [LucideAngularModule],
  templateUrl: './crypto-calculator.component.html',
  styles: ``
})
export class CryptoCalculatorComponent {

  readonly calculatorIcon = Calculator;

}
