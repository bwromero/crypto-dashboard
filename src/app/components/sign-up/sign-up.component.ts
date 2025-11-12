import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../shared/components/button/button.component';
import { ArrowRight, AtSign, LucideAngularModule } from 'lucide-angular';
 
@Component({
  selector: 'app-sign-up',
  imports: [ButtonComponent, LucideAngularModule],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export class SignUpComponent {
  readonly arrowRightIcon = ArrowRight;
  readonly atSignIcon = AtSign;



  toggleOptions: ToggleOption[] = [
    { label: 'Login', value: 'login' },
    { label: 'SignUp', value: 'signup' }
  ]

  selectedToggleValue: string = 'signup';

  onToggleChanged($event: string) {
    throw new Error('Method not implemented.');
  }

}
