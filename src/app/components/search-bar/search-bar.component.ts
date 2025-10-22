import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
export type SearchBarType = 'normal' | 'dropdown';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
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
  private searchTimeout!: ReturnType<typeof setTimeout>;
  
  // Single method that handles both input and enter key
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      this.search.emit(target.value);
    }, 500);
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.isDropdownOpen = false;
  }
}
