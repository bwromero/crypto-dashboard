import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../../shared/components/button/button.component';
import { ArrowRight, Edit, Lock, LucideAngularModule } from 'lucide-angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { ActivatedRoute, Router } from '@angular/router';
import { QrCodeService } from '../../../services/qr-code-service/qrcode-service.service';
import { signal, computed, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export enum ToggleValue {
  SYSTEM = 'system',
  GOOGLE = 'google'
}

export enum RadioButtonValue {
  SMS = 'sms',
  EMAIL = 'email'
}
@Component({
  selector: 'app-comfirmation-method',
  imports: [ButtonComponent, LucideAngularModule, QRCodeComponent, ],
  templateUrl: './comfirmation-method.component.html',
  styles: ``,
})
export class ComfirmationMethodComponent {

  readonly toggleOptions: ToggleOption[] = [
    { label: 'System', value: ToggleValue.SYSTEM },
    { label: 'Google', value: ToggleValue.GOOGLE }
  ];

  readonly arrowRightIcon = ArrowRight;
  readonly padlockIcon = Lock;
  readonly editIcon = Edit;
  readonly RadioButtonValue = RadioButtonValue;

  //main state of selected confirmation method
  selectedMethod = signal<RadioButtonValue | null>(null);
  selectedToggleValue = signal<ToggleValue | null>(ToggleValue.SYSTEM);
  qrCodeData = signal<string>('');
  qrCodeSessionId = signal<string | null>(null);

  showCodeInput = signal<boolean>(false);

  constructor(private route: ActivatedRoute, private router: Router, private qrCodeService: QrCodeService) {
    let codeData = this.qrCodeService.generateQRCodeData();
    this.qrCodeData.set(codeData.qrCodeData);
    this.qrCodeSessionId.set(codeData.sessionId);

    this.route.data.pipe(
      takeUntilDestroyed()
    ).subscribe(data => {
      this.selectedToggleValue.set(data['mode'] || ToggleValue.SYSTEM);
    });

    this.route.queryParams.pipe(
      takeUntilDestroyed()
    ).subscribe(params => {
      const method = params['method'] as RadioButtonValue;
      if (method === RadioButtonValue.SMS || method === RadioButtonValue.EMAIL) {
        this.selectedMethod.set(method);
        this.showCodeInput.set(true);
      } else {
        this.selectedMethod.set(null);
        this.showCodeInput.set(false);
      }
    });
  }

  onToggleChanged($event: string) {
    this.selectedToggleValue.set($event as ToggleValue);
  }

  onContinueClick(event: Event) {
    event?.preventDefault();
    const method = this.selectedMethod();
    if (!method) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        method: method
      },
      queryParamsHandling: 'merge'
    })
    this.showCodeInput.set(true);
  }

  onRadioButtonChange($event: Event) {
    const method = ($event.target as HTMLInputElement).value as RadioButtonValue;
    this.selectedMethod.set(method);
  }

}
