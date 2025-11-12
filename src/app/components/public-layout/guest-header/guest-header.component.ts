import { Component } from '@angular/core';
import { ButtonComponent, DropdownOption } from '../../shared/components/button/button.component';
import { LayoutDashboard, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-guest-header',
  imports: [ButtonComponent, LucideAngularModule],
  standalone: true,
  templateUrl: './guest-header.component.html',
  styles: ``
})
export class GuestHeaderComponent {

  protected LayoutDashboard = LayoutDashboard;

  onLanguageSelected($event: DropdownOption) {
    throw new Error('Method not implemented.');
  }

}
