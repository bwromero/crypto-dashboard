import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ButtonComponent, DropdownOption } from '../../components/button/button.component';
@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [SearchBarComponent, ButtonComponent],
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

  get displayLabel(): string {
    return `Show rows: ${this.selectedRowOption.value}`
  }

  onRowOptionSelected(option: any){
    this.selectedRowOption = option;
  }

}
