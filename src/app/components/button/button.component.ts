import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';

export type ButtonType = 'primary' | 'secondary' | 'action' | 'dark' | 'darkSecondary' | 'transparent';
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
export interface ButtonConfig {
  name?: string;
  variant: ButtonVariant;
  type: ButtonType;
  lucideIcon?: string;
  icon?: string;
  label?: string;
  isSelected: boolean;
  disabled?: boolean;
  bgColor?: string;
  dropdownOptions?: DropdownOption[];
  toggleOptions?: ToggleOption[];
  // Add more properties as needed for future use
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
  @Input() borderClass: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() buttonSize: string = '';
  @Input() iconSize: number = 24;
  @Input() lucideIcon?: any;
  @Input() dropdownOptions: DropdownOption[] = [];
  @Input() selectedOption?: DropdownOption;
  @Input() toggleOptions: ToggleOption[] = [];
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() selectedToggleValue?: string;
  @Input() buttonSelected: boolean = false;
  
  @Output() clicked = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<DropdownOption>();
  @Output() toggleChanged = new EventEmitter<string>();

  isDropdownOpen: boolean = false;

  // Make all Lucide icons available to the template
  protected icons = icons;

  get buttonClasses(): string {
    const baseClasses = 'flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 ' + this.buttonSize;
    const widthClass = this.fullWidth ? 'w-full' : '';
    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const typeClasses = {
      primary: 'bg-primary text-primary hover:bg-primary/90',
      secondary: 'bg-secondary text-primary hover:bg-secondary/90',
      action: 'bg-action text-primary hover:bg-action/90',
      dark: 'bg-dark-primary text-primary hover:bg-dark-primary/90',
      darkSecondary: 'bg-dark-secondary text-primary hover:bg-dark-secondary/90',
      transparent: 'bg-transparent text-primary hover:bg-dark-primary ' + this.borderClass
    };

    this.type = this.buttonSelected? 'action' : this.type;

    return `${baseClasses} ${typeClasses[this.type]} ${widthClass} ${disabledClass}`;
  }

  get getIconImage() {
    if (!this.lucideIcon){
      return this.icons['House'];

    } else {
      return this.icons[this.lucideIcon as keyof typeof this.icons];
    };
  }

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