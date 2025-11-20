import { Component, Input } from '@angular/core';
import { ButtonComponent, DropdownOption } from '../../shared/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { NavigationSection } from '../../../layout/sidebar/sidebar.component';
import { NavigationItem, NavigationItemComponent } from '../../shared/components/navigation-item/navigation-item.component';

@Component({
  selector: 'app-guest-header',
  imports: [ButtonComponent, LucideAngularModule, NavigationItemComponent],
  standalone: true,
  templateUrl: './guest-header.component.html',
  styles: ``
})
export class GuestHeaderComponent {

  @Input() navigationItems: NavigationItem[] = [];

  onLanguageSelected($event: DropdownOption) {
    throw new Error('Method not implemented.');
  }

}
