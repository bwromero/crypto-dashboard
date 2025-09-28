import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';
import { NavigationItem, NavigationItemComponent } from '../../components/navigation-item/navigation-item.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NavigationItemComponent, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  protected icons = icons;

  navigationItems: NavigationItem[] = [
    { label: 'Exchange', route: '/exchange', lucideIcon: 'ArrowLeftRight' },
    { label: 'Live Prices', route: '/live-prices', lucideIcon: 'TrendingUp' },
    { label: 'Wallet', route: '/wallet', lucideIcon: 'Wallet' },
    { label: 'NFT Market', route: '/nft-market', lucideIcon: 'Store', badge: 'New', badgeColor: 'bg-orange-500 text-white' },
    { label: 'Transactions', route: '/transactions', lucideIcon: 'ArrowUpDown' },
    { label: 'Settings', route: '/settings', lucideIcon: 'Settings' },
    { label: 'News', route: '/news', lucideIcon: 'Newspaper' }
  ];

}
