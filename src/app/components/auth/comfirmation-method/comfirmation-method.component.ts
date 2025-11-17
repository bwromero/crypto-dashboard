import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../../shared/components/button/button.component';
import { ArrowRight, Lock, LucideAngularModule } from 'lucide-angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { ActivatedRoute, Router } from '@angular/router';

enum ToggleValue {
  SYSTEM = 'system',
  GOOGLE = 'google'
}

enum RadioButtonValue {
  SMS = 'sms',
  EMAIL = 'email'
}
@Component({
  selector: 'app-comfirmation-method',
  imports: [ButtonComponent, LucideAngularModule, QRCodeComponent],
  templateUrl: './comfirmation-method.component.html',
  styles: ``,
})
export class ComfirmationMethodComponent {

onVerificationMethodChange(arg0: any) {
throw new Error('Method not implemented.');
}
  readonly toggleOptions: ToggleOption[] = [
    { label: 'System', value: ToggleValue.SYSTEM },
    { label: 'Google', value: ToggleValue.GOOGLE }
  ];

  readonly radioButtonOptions = [
    { label: 'SMS', value: RadioButtonValue.SMS, icon: 'sms' },
    { label: 'Email', value: RadioButtonValue.EMAIL, icon: 'at-sign' }
  ];

  readonly arrowRightIcon = ArrowRight;
  readonly padlockIcon = Lock;

  qrCodeData: string = '';
  qrCodeSessionId: string = '';
  isSMSSelected: boolean = false;
  isEmailSelected: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.selectedToggleValue = data['mode'] || ToggleValue.SYSTEM;
    });
  }

  selectedToggleValue: string = ToggleValue.SYSTEM;

  onToggleChanged($event: string) {
    this.selectedToggleValue = $event;
  }




  onRadioButtonChange(method: RadioButtonValue) {
    if (method === RadioButtonValue.SMS) {
      this.isSMSSelected = true;
      this.isEmailSelected = false;
    } else {
      this.isSMSSelected = false;
      this.isEmailSelected = true;
    }
  }
}
