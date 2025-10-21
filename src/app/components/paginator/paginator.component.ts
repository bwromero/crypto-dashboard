import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './paginator.component.html',
  styles: ``
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Input() showLoadMore: boolean = true;
  
  @Output() loadMoreClicked = new EventEmitter<void>();

  protected icons = icons;
  rectangleEllipsis = icons.RectangleEllipsis;
  pages: number[] = [1, 2, 3, 4];

  onLoadMore() {
    this.loadMoreClicked.emit();
  }
}
