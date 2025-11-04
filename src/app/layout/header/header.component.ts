import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/components/search-bar/search-bar.component';
import { ButtonComponent, DropdownOption } from '../../components/shared/components/button/button.component';
import { LucideAngularModule, LayoutDashboard } from 'lucide-angular';

@Component({
    selector: 'app-header',
    imports: [CommonModule, SearchBarComponent, ButtonComponent, LucideAngularModule],
    templateUrl: './header.component.html',
    styles: ``
})
export class HeaderComponent {
  protected LayoutDashboard = LayoutDashboard;

  onLanguageSelected(option: DropdownOption) {
    console.log('Selected language:', option);
  }
}
