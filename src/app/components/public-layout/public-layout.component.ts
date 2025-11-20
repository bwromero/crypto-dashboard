import { Component } from '@angular/core';
import { ButtonComponent, DropdownOption } from '../shared/components/button/button.component';
import { LayoutDashboard, LucideAngularModule } from 'lucide-angular';
import { RouterOutlet } from '@angular/router';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { NavigationSection } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-public-layout',
  imports: [GuestHeaderComponent, RouterOutlet],
  templateUrl: './public-layout.component.html',
  styles: ``
})
export class PublicLayoutComponent {

  navigationSections: NavigationSection[] = [
    {
      items: [
        { label: 'Buy Crypto', route: '/exchange' },
        { label: 'Market', route: '/live-prices' },
        { label: 'NFT', route: '/wallet', badge: 'New', badgeColor: 'bg-orange-500 text-primary' },
        { label: 'Promotion', route: '/promotion' },
        { label: 'About', route: '/about' },
        { label: 'Blog', route: '/blog' }
      ]
    }
  ];
}
