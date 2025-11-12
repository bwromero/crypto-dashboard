import { Component } from '@angular/core';
import { ButtonComponent, DropdownOption } from '../shared/components/button/button.component';
import { LayoutDashboard, LucideAngularModule } from 'lucide-angular';
import { RouterOutlet } from '@angular/router';
import { GuestHeaderComponent } from './guest-header/guest-header.component';

@Component({
  selector: 'app-public-layout',
  imports: [GuestHeaderComponent, RouterOutlet],
  templateUrl: './public-layout.component.html',
  styles: ``
})
export class PublicLayoutComponent {

}
