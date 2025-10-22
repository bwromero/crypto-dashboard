import { Component, EventEmitter, Input, Output } from '@angular/core';
export type SearchBarType = 'normal' | 'dropdown';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styles: ``
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Input() dropdownOptions: string[] = [];
  @Input() selectedOption: string = '';
  @Input() bgColor: string = 'bg-dark-secondary';

  @Output() search = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<string>();
  
  searchText: string = '';
  isDropdownOpen: boolean = false;

  onSearch(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    this.searchText = target.value; // Store the value
    this.search.emit(target.value); // Emit the string value, not the target
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value;
    this.search.emit(target.value); // ✅ Emit on every keystroke
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.isDropdownOpen = false;
  }
}
