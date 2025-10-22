import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, icons } from 'lucide-angular';

@Component({
  selector: 'app-bubble-view-header',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './bubble-view-header.component.html',
  styles: ``
})
export class BubbleViewHeaderComponent {
  @Input() searchQuery: string = '';
  @Input() rowLimit: string = '10';
  @Input() lastUpdated: string = '1 min 48s ago';
  @Input() viewMode: 'bubble' | 'list' = 'bubble';

  @Output() searchChange = new EventEmitter<string>();
  @Output() rowLimitChange = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<'bubble' | 'list'>();

  protected icons = icons;

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onRowLimitChange(value: string) {
    this.rowLimitChange.emit(value);
  }

  onViewModeChange(mode: 'bubble' | 'list') {
    this.viewModeChange.emit(mode);
  }
}
