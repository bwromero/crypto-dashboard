import { Component } from '@angular/core';
import { ArrowUpDown, Calculator, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-crypto-calculator',
  imports: [LucideAngularModule],
  templateUrl: './crypto-calculator.component.html',
  styles: ``
})
export class CryptoCalculatorComponent {

  readonly calculatorIcon = Calculator;
  readonly arrowupanddownIcon = ArrowUpDown;
}
