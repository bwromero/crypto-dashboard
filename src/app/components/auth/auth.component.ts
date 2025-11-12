import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../shared/components/button/button.component';
import { ArrowRight, AtSign, LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

enum ToggleValue {
  LOGIN = 'login',
  SIGNUP = 'signup'
}
@Component({
  selector: 'app-auth',
  imports: [ButtonComponent, LucideAngularModule, QRCodeComponent],
  templateUrl: './auth.component.html',
  styles: ``
})
export class AuthComponent {
  readonly arrowRightIcon = ArrowRight;
  readonly atSignIcon = AtSign;

  qrCodeData: string = '';
  qrCodeSessionId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.selectedToggleValue = data['mode'] || ToggleValue.LOGIN;

      if (this.isLoginMode) {
        this.generateQRCode();
      }
    });
  }

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
    const targetRoute = $event === ToggleValue.LOGIN ? `/${ToggleValue.LOGIN}` : `/${ToggleValue.SIGNUP}`;
    this.router.navigate([targetRoute]);
    this.selectedToggleValue = $event;
  }

  generateQRCode(): void {
    this.qrCodeSessionId = this.generateSessionId();
    this.qrCodeData = `https://your-app.com/auth/qr?session=${this.qrCodeSessionId}`;
  }

  private generateSessionId(): string {
    // Generate a unique session ID
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  onRefreshQRCode(): void {
    this.generateQRCode();
  }

}
