import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';

export type ButtonType = 'primary' | 'secondary' | 'action' | 'dark';
export type ButtonVariant = 'normal' | 'dropdown' | 'toggle' | 'sidebar-toggle'; 

export interface DropdownOption {
  label: string;
  value: string;
}
export interface ToggleOption {
  label: string;
  value: string;
  icon?: string;
  lucideIcon?: string;
  show?: boolean;
}
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input() variant: ButtonVariant = 'normal';
  @Input() bgColor: string = 'bg-dark-secondary';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() lucideIcon?: any;
  @Input() dropdownOptions: DropdownOption[] = [];
  @Input() selectedOption?: DropdownOption;
  @Input() toggleOptions: ToggleOption[] = [];
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() selectedToggleValue?: string;
  
  @Output() clicked = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<DropdownOption>();
  @Output() toggleChanged = new EventEmitter<string>();

  isDropdownOpen: boolean = false;

  // Make all Lucide icons available to the template
  protected icons = icons;

  get buttonClasses(): string {
    const baseClasses = 'flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200';
    const widthClass = this.fullWidth ? 'w-full' : '';
    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    const typeClasses = {
      primary: 'bg-primary text-primary hover:bg-primary/90',
      secondary: 'bg-secondary text-primary hover:bg-secondary/90',
      action: 'bg-action text-primary hover:bg-action/90',
      dark: 'bg-dark-primary text-primary hover:bg-dark-primary/90'
    };

    return `${baseClasses} ${this.bgColor} ${typeClasses[this.type]} ${widthClass} ${disabledClass}`;
  }

  get getIconImage() {
    if (!this.lucideIcon){
      return this.icons['House'];

    } else {
      return this.icons[this.lucideIcon as keyof typeof this.icons];
    };
  }

  // Add this method to your ButtonComponent class
getToggleIconImage(iconName: string) {
  return this.icons[iconName as keyof typeof this.icons];
}

  onClick() {
    if (this.disabled) return;
    
    if (this.variant === 'dropdown') {
      this.toggleDropdown();
    } else {
      this.clicked.emit();
    }
  }

  toggleDropdown() {
    if (this.disabled) return;
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: DropdownOption) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.isDropdownOpen = false;
  }
  
  selectToggleOption(option: ToggleOption) {
    this.selectedToggleValue = option.value;
    this.toggleChanged.emit(option.value);
  }
}