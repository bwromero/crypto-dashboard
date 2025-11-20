import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { NavigationSection } from '../../../../layout/sidebar/sidebar.component';

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
    imports: [CommonModule, RouterModule, LucideAngularModule],
    templateUrl: './navigation-item.component.html'
})
export class NavigationItemComponent {
  @Input() section!: NavigationSection;
  @Input() item!: NavigationItem;
  @Input() isActive: boolean = false;
  @Input() isGuestHeader: boolean = false;

  protected icons = icons;

  getIconImage(iconName: string) {
    return this.icons[iconName as keyof typeof this.icons];
  }

  get getClasses(): string {
    if(this.isGuestHeader){
      return 'flex items-center content-center text-primary hover:text-primary hover:bg-dark-secondary rounded-xl transition-all duration-200 group';
    } 
    return 'flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-dark-secondary rounded-xl transition-all duration-200 group';
  }
}
