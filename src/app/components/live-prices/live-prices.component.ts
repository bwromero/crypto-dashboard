import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ButtonComponent, ButtonConfig, ButtonType, DropdownOption } from '../button/button.component';

@Component({
  selector: 'app-live-prices',
  standalone: true,
  imports: [SearchBarComponent, ButtonComponent, CommonModule],
  templateUrl: './live-prices.component.html',
  styles: ``
})
export class LivePricesComponent {
  rowDropDownOptions: DropdownOption[] = [
    {label: '', value: '10'},
    {label: '', value: '20'},
    {label: '', value: '30'},
    {label: '', value: '40'},
  ];

  selectedRowOption: DropdownOption = this.rowDropDownOptions[0];

  buttonList: ButtonConfig[] = [
    {variant: 'normal', type: 'action', lucideIcon: 'List', isSelected: false},
    {variant: 'normal', type: 'darkSecondary', lucideIcon: 'LayoutDashboard', isSelected: false},
    {variant: 'normal', type: 'darkSecondary', lucideIcon: 'Bubbles', isSelected: false},
  ];

  get displayLabel(): string {
    return `Show rows: ${this.selectedRowOption.value}`
  }

  onRowOptionSelected(option: DropdownOption){
    this.selectedRowOption = option;
  }

  onButtonSelected(clickedButton: ButtonConfig){
    // Reset all buttons to darkSecondary
    this.buttonList.forEach(button => {
      button.isSelected = false;
      button.type = 'darkSecondary' as ButtonType;
    });
    
    // Set the clicked button to action (green) and selected
    clickedButton.isSelected = true;
    clickedButton.type = 'action' as ButtonType;
  }
}
