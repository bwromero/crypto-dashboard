import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent, ButtonConfig, DropdownOption } from '../../shared/components/button/button.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toolbar',
    imports: [ButtonComponent, CommonModule, SearchBarComponent],
    templateUrl: './toolbar.component.html',
    styles: ``
})
export class ToolbarComponent {

  @Output() viewSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() numOfRowsSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() searchQueryChanged: EventEmitter<string> = new EventEmitter<string>();

  rowDropDownOptions: DropdownOption[] = [
    {label: '', value: '10'},
    {label: '', value: '20'},
    {label: '', value: '30'},
    {label: '', value: '40'},
  ];

  selectedRowOption: DropdownOption = this.rowDropDownOptions[0];

  buttonList: ButtonConfig[] = [
    {name: 'list', variant: 'normal', type: 'action', lucideIcon: 'List', isSelected: true},
    {name: 'heatmap', variant: 'normal', type: 'darkSecondary', lucideIcon: 'LayoutDashboard', isSelected: false},
    {name: 'bubbles', variant: 'normal', type: 'darkSecondary', lucideIcon: 'Bubbles', isSelected: false},
  ];

  get displayLabel(): string {
    return `Show rows: ${this.selectedRowOption.value}`
  }

  onRowOptionSelected(option: DropdownOption){
    this.selectedRowOption = option;
    this.numOfRowsSelected.emit(parseInt(option.value || '10'));
  }

  onSearchQueryChanged(searchQuery: string) {
    this.searchQueryChanged.emit(searchQuery);
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
    this.viewSelected.emit(clickedButton.name);
  }
}
