import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { ButtonComponent, DropdownOption } from '../../shared/components/button/button.component';
import { LucideAngularModule, LayoutDashboard } from 'lucide-angular';
import { ModalConfig, ModalService } from '../../services/modal/modal.service';
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
      // Using SVG flags from Figma
      { label: 'English', value: 'en', flag: FLAG_ICONS.en },
      { label: 'German', value: 'de', flag: FLAG_ICONS.de },
      { label: 'French', value: 'fr', flag: FLAG_ICONS.fr },
      { label: 'Chinese', value: 'zh', flag: FLAG_ICONS.zh },
      { label: 'Swedish', value: 'sv', flag: FLAG_ICONS.sv },
      { label: 'Spanish', value: 'es', flag: FLAG_ICONS.es },
    ]
  }

  selectedCurrency = 'USD';
  selectedTheme = 'dark';

  settingsModalConfig: ModalConfig = {
    type: 'settings',
    title: 'Settings',
    settings: [
      { 
        label: 'Currency', 
        value: 'currency', 
        settingType: 'selectable',
        displayValue: 'USD',
        flag: FLAG_ICONS.en // Using US flag for USD
      },
      { 
        label: 'Theme', 
        value: 'theme', 
        settingType: 'theme',
        checked: true, // true = dark, false = light
        themeOptions: [
          { label: 'Light', value: 'light', icon: 'Sun' },
          { label: 'Dark', value: 'dark', icon: 'Moon' }
        ]
      },
      { 
        label: 'Language', 
        value: 'language', 
        settingType: 'selectable',
        displayValue: 'English US'
      },
    ]
  }

  constructor(private modalService: ModalService) {
    // Watch for modal config changes and update selected language
    effect(() => {
      const config = this.modalService.config();
      if (config?.type === 'language' && config.selectedValue && config.selectedValue !== this.selectedLanguage) {
        this.selectedLanguage = config.selectedValue;
        // Update our local config to keep it in sync (create new object reference for change detection)
        this.languageModalConfig = {
          ...this.languageModalConfig,
          selectedValue: config.selectedValue
        };
      }
    });
  }

  onLanguageSelected(option: DropdownOption) {
    this.selectedLanguage = option.value;
    this.languageModalConfig.selectedValue = option.value;
    console.log('Selected language:', option);
  }
}
