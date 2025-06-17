import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ButtonComponent, DropdownOption } from '../../components/button/button.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  onLanguageSelected(option: DropdownOption) {
    console.log('Selected language:', option);
  }
}
