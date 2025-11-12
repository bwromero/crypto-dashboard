import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../shared/components/button/button.component';
import { ArrowRight, AtSign, LucideAngularModule } from 'lucide-angular';
 
enum ToggleValue {
  LOGIN = 'login',
  SIGNUP = 'signup'
}
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
    { label: 'Login', value: ToggleValue.LOGIN },
    { label: 'SignUp', value: ToggleValue.SIGNUP }
  ]

  selectedToggleValue: string = ToggleValue.SIGNUP;

  get isLoginMode(): boolean {
    return this.selectedToggleValue === ToggleValue.LOGIN;
  }

  get isSignUpMode(): boolean {
    return this.selectedToggleValue === ToggleValue.SIGNUP;
  }

  onToggleChanged($event: string) {
    this.selectedToggleValue = $event;
  }

}
