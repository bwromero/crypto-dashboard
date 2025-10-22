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
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, this.currentPage - halfVisible);
    let endPage = Math.min(this.totalPages, this.currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    this.visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
    
    this.showStartEllipsis = startPage > 2;
    this.showEndEllipsis = endPage < this.totalPages - 1;
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
