import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/components/search-bar/search-bar.component';
import { ButtonComponent, DropdownOption } from '../../components/shared/components/button/button.component';
import { LucideAngularModule, LayoutDashboard } from 'lucide-angular';
import { ModalConfig } from '../../services/modal/modal.service';


@Component({
    selector: 'app-header',
    imports: [CommonModule, SearchBarComponent, ButtonComponent, LucideAngularModule],
    templateUrl: './header.component.html',
    styles: ``
})
export class HeaderComponent {
  protected LayoutDashboard = LayoutDashboard;

  languageModalConfig: ModalConfig = {
    type: 'language',
    title: 'Select Language',
    options: [
      { label: 'English', value: 'en' },
      { label: 'German', value: 'de' },
      { label: 'French', value: 'fr' },
      { label: 'Chinese', value: 'zh' },
      { label: 'Swedish', value: 'sv' },
      { label: 'Spanish', value: 'es' },
    ]
  }

  onLanguageSelected(option: DropdownOption) {
    console.log('Selected language:', option);
  }
}
