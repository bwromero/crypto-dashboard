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
  @Input() numberOfItems: number = 100;
  
  @Output() loadMoreClicked = new EventEmitter<void>();
  @Output() pageClick = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();

  visiblePages: number[] = [1, 2, 3, 4];
  pages: number[] = [1, 2, 3, 4];

  onPageClick(page: number) {
    this.pageClick.emit(page);
  }

  onRefresh() {
    this.refresh.emit();
  }

  onLoadMore() {
    this.loadMoreClicked.emit();
  }
}
