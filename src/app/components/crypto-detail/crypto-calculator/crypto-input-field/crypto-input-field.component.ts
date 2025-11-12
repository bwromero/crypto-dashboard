import { Component } from '@angular/core';
import { Calculator, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-crypto-input-field',
  imports: [LucideAngularModule],
  templateUrl: './crypto-input-field.component.html',
  styles: ``
})
export class CryptoInputFieldComponent {
  readonly calculatorIcon = Calculator;
}
