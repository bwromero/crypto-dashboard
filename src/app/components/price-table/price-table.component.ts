import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ButtonComponent, ButtonType, ButtonVariant, DropdownOption } from '../../components/button/button.component';
@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [SearchBarComponent, ButtonComponent, CommonModule],
  templateUrl: './price-table.component.html',
  styles: ``
})
export class PriceTableComponent {
  rowDropDownOptions:DropdownOption[] = [
    {label: '', value: '10'},
    {label: '', value: '20'},
    {label: '', value: '30'},
    {label: '', value: '40'},
  ];

  selectedRowOption: DropdownOption = this.rowDropDownOptions[0];

  buttonList = [
    {variant: 'normal' as ButtonVariant, type: 'darkSecondary' as ButtonType, lucideIcon: 'List', isSelected: true},
    {variant: 'normal' as ButtonVariant, type: 'darkSecondary' as ButtonType, lucideIcon: 'LayoutDashboard', isSelected: false},
    {variant: 'normal' as ButtonVariant, type: 'darkSecondary' as ButtonType, lucideIcon: 'Bubbles', isSelected: false},
  ];

  get displayLabel(): string {
    return `Show rows: ${this.selectedRowOption.value}`
  }

  onRowOptionSelected(option: any){
    this.selectedRowOption = option;
  }

}
