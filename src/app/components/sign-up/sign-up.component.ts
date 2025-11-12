import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../shared/components/button/button.component';

@Component({
  selector: 'app-sign-up',
  imports: [ButtonComponent],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export class SignUpComponent {

  toggleOptions: ToggleOption[] = [
    { label: 'Login', value: 'login' },
    { label: 'SignUp', value: 'signup' }
  ]

  selectedToggleValue: string = 'signup';

  onToggleChanged($event: string) {
    throw new Error('Method not implemented.');
  }

}
