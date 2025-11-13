import { Component } from '@angular/core';
import { ButtonComponent, ToggleOption } from '../../shared/components/button/button.component';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { ActivatedRoute, Router } from '@angular/router';

enum ToggleValue {
  SYSTEM = 'system',
  GOOGLE = 'google'
}
@Component({
  selector: 'app-comfirmation-method',
  imports: [ButtonComponent, LucideAngularModule, QRCodeComponent],
  templateUrl: './comfirmation-method.component.html',
  styles: ``,
})
export class ComfirmationMethodComponent {
  readonly toggleOptions: ToggleOption[] = [
    { label: 'System', value: ToggleValue.SYSTEM },
    { label: 'Google', value: ToggleValue.GOOGLE }
  ];

  readonly arrowRightIcon = ArrowRight;

  qrCodeData: string = '';
  qrCodeSessionId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.selectedToggleValue = data['mode'] || ToggleValue.SYSTEM;
    });
  }

  selectedToggleValue: string = ToggleValue.SYSTEM;

  onToggleChanged($event: string) {
    this.selectedToggleValue = $event;
  }


}
