import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { ButtonComponent, DropdownOption } from '../../shared/components/button/button.component';
import { LucideAngularModule, LayoutDashboard } from 'lucide-angular';
import { ModalConfig } from '../../services/modal/modal.service';
import { FLAG_ICONS } from '../../shared/constants/flag-icons';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SearchBarComponent, LucideAngularModule, ButtonComponent],
  templateUrl: './header.component.html',
  standalone: true,
  styles: ``
})
export class HeaderComponent {
  protected LayoutDashboard = LayoutDashboard;
  selectedLanguage = 'en'; // Track selected language

  languageModalConfig: ModalConfig = {
    type: 'language',
    title: 'Select Language',
    selectedValue: this.selectedLanguage, // Pass selected value
    options: [
      // Using SVG flag for English (from Figma)
      { label: 'English', value: 'en', flag: FLAG_ICONS.en },
      // Using emoji flags for others until SVG flags are added
      { label: 'German', value: 'de', flag: '🇩🇪' },
      { label: 'French', value: 'fr', flag: '🇫🇷' },
      { label: 'Chinese', value: 'zh', flag: '🇨🇳' },
      { label: 'Swedish', value: 'sv', flag: '🇸🇪' },
      { label: 'Spanish', value: 'es', flag: '🇪🇸' },
    ]
  }

  onLanguageSelected(option: DropdownOption) {
    this.selectedLanguage = option.value;
    this.languageModalConfig.selectedValue = option.value;
    console.log('Selected language:', option);
  }
}
