import { Component } from '@angular/core';
import { ArrowUpDown, Calculator, LucideAngularModule } from 'lucide-angular';
import { CryptoInputFieldComponent } from './crypto-input-field/crypto-input-field.component';

@Component({
  selector: 'app-crypto-calculator',
  imports: [LucideAngularModule, CryptoInputFieldComponent],
  templateUrl: './crypto-calculator.component.html',
  styles: ``
})
export class CryptoCalculatorComponent {

  readonly calculatorIcon = Calculator;
  readonly arrowupanddownIcon = ArrowUpDown;
}
