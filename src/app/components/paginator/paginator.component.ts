import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class PaginatorComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Input() showLoadMore: boolean = true;
  @Input() numberOfItems: number = 100;
  
  @Output() loadMoreClicked = new EventEmitter<void>();
  @Output() pageClick = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();

  protected icons = icons;
  visiblePages: number[] = [];
  showStartEllipsis: boolean = false;
  showEndEllipsis: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateVisiblePages();
  }

  private calculateVisiblePages(): void {
    if (this.totalPages <= 4) {
      this.visiblePages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.visiblePages.push(i);
      }
      this.showStartEllipsis = false;
      this.showEndEllipsis = false;
    } else {
      if (this.currentPage <= 2) {
        this.visiblePages = [1, 2, 3];
        this.showStartEllipsis = false;
        this.showEndEllipsis = true;
      } else if (this.currentPage >= this.totalPages - 1) {
        this.visiblePages = [this.totalPages - 2, this.totalPages - 1, this.totalPages];
        this.showStartEllipsis = true;
        this.showEndEllipsis = false;
      } else {
        this.visiblePages = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
        this.showStartEllipsis = true;
        this.showEndEllipsis = true;
      }
    }
  }

  onPageClick(page: number) {
    this.pageClick.emit(page);
  }

  onRefresh() {
    this.refresh.emit();
  }

  onLoadMore() {
    this.loadMoreClicked.emit();
  }

  onFirstPage() {
    this.pageClick.emit(1);
  }

  onLastPage() {
    this.pageClick.emit(this.totalPages);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.pageClick.emit(this.currentPage - 1);
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageClick.emit(this.currentPage + 1);
    }
  }
}

