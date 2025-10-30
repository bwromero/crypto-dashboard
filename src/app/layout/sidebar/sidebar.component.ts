import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons, ChevronLeft } from 'lucide-angular';
import { NavigationItem, NavigationItemComponent } from '../../components/navigation-item/navigation-item.component';
import { ButtonComponent, ToggleOption } from '../../components/shared/components/button/button.component';

export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, NavigationItemComponent, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  protected icons = icons;
  selectedTheme = 'dark'; // Default to dark mode
  selectedSideBarToggle = 'open'; // Default to dark mode
  ChevronLeft = ChevronLeft;

  navigationSections: NavigationSection[] = [
    {
      items: [
        { label: 'Exchange', route: '/exchange', lucideIcon: 'ArrowLeftRight' },
        { label: 'Live Prices', route: '/live-prices', lucideIcon: 'TrendingUp' },
        { label: 'Wallet', route: '/wallet', lucideIcon: 'Wallet' },
        { label: 'NFT Market', route: '/nft-market', lucideIcon: 'Store', badge: 'New', badgeColor: 'bg-orange-500 text-primary' },
        { label: 'Transactions', route: '/transactions', lucideIcon: 'ArrowUpDown' },
        { label: 'Settings', route: '/settings', lucideIcon: 'Settings' },
        { label: 'News', route: '/news', lucideIcon: 'Newspaper' }
      ]
    },
    {
      title: 'Insights',
      items: [
        { label: 'Inbox', route: '/inbox', lucideIcon: 'MessageCircle', badge: '8', badgeColor: 'bg-red-500 text-primary' }
      ]
    }
  ];

  themeToggleOptions: ToggleOption[] = [
    { label: 'Light', value: 'light', lucideIcon: 'Sun' },
    { label: 'Dark', value: 'dark', lucideIcon: 'Moon' }
  ];

  sideBarToggleOptions: ToggleOption[] = [
    { label: 'Open', value: 'open', lucideIcon: 'ChevronLeft', show: true },
    { label: 'Closed', value: 'closed', lucideIcon: 'ChevronRight', show: false  }
  ]

  onThemeToggleChanged(value: string) {
    this.selectedTheme = value;
    console.log('Theme switched to:', value);
    // Add your theme switching logic here
  }

  onSideBarToggleChanged(value: string) {

  }
}
