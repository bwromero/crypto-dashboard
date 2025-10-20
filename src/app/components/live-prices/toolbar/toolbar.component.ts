import { Component } from '@angular/core';
import { ButtonComponent, ButtonConfig, ButtonType, DropdownOption } from '../../button/button.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ButtonComponent, CommonModule, SearchBarComponent],
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent {

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
      button.type = 'darkSecondary';
    });
    
    // Set the clicked button to action (green) and selected
    clickedButton.isSelected = true;
    clickedButton.type = 'action';
  }
}
