import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../../shared/components/button/button.component';
import { ArrowRight, Edit, Lock, LucideAngularModule } from 'lucide-angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { ActivatedRoute, Router } from '@angular/router';
import { QrCodeService } from '../../../services/qr-code-service/qrcode-service.service';

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
  readonly editIcon = Edit;

  qrCodeData: string = '';
  qrCodeSessionId: string = '';
  isSMSSelected: boolean = false;
  isEmailSelected: boolean = true;
  showCodeInput: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private qrCodeService: QrCodeService) {
    let codeData = this.qrCodeService.generateQRCodeData();
    this.qrCodeData = codeData.qrCodeData;
    this.qrCodeSessionId = codeData.sessionId;

    this.route.data.subscribe(data => {
      this.selectedToggleValue = data['mode'] || ToggleValue.SYSTEM;
    });

    this.route.queryParams.subscribe(params => {
      if (params['method'] === 'sms') {
        this.isSMSSelected = true;
        this.isEmailSelected = false;
        this.showCodeInput = true; // If method is in URL, show code input
      } else if (params['method'] === 'email') {
        this.isSMSSelected = false;
        this.isEmailSelected = true;
        this.showCodeInput = true;
      }
    });
  }

  selectedToggleValue: string = ToggleValue.SYSTEM;

  onToggleChanged($event: string) {
    this.selectedToggleValue = $event;
  }

  onContinueClick(event: Event) {
    event?.preventDefault();
    const method = this.isSMSSelected ? RadioButtonValue.SMS : RadioButtonValue.EMAIL;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        method: method
      },
      queryParamsHandling: 'merge'
    })
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
