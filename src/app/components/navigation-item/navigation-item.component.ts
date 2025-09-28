import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';

export interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  lucideIcon?: string;
  badge?: string;
  badgeColor?: string;
}

@Component({
  selector: 'app-navigation-item',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navigation-item.component.html'
})
export class NavigationItemComponent {
  @Input() item!: NavigationItem;
  @Input() isActive: boolean = false;

  protected icons = icons;

  getIconImage(iconName: string) {
    return this.icons[iconName as keyof typeof this.icons];
  }
}
