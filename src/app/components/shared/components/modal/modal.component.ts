import { Component, OnInit, OnDestroy, computed, effect } from '@angular/core';
import { icons, X, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ModalOption, ModalService, ModalType, NotificationItem, ModalConfig } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modal.component.html',
  styles: ``,
})
export class ModalComponent implements OnInit, OnDestroy {
  readonly closeIcon = X;
  protected icons = icons;
  
  // Expose config data as computed signals for template access
  readonly config = computed(() => this.modalService.config());
  readonly isOpen = computed(() => this.modalService.isOpen());
  readonly modalType = computed(() => this.config()?.type || null);
  readonly title = computed(() => this.config()?.title);
  readonly options = computed(() => this.config()?.options || []);
  readonly settings = computed(() => this.config()?.settings || []);
  readonly notifications = computed(() => this.config()?.notifications || []);

  constructor(private modalService: ModalService) {
    // Update body overflow when modal opens/closes
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  ngOnInit(): void {
    // Initial check
    if (this.modalService.isOpen()) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  close() {
    this.modalService.close();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onOptionSelect(option: ModalOption) {
    // emit selection event
    this.close();
  }

  onNotificationClick(notification: NotificationItem) {
    notification.read = true;
  }

  getIcon(iconName?: string) {
    if (!iconName) return undefined;
    return this.icons[iconName as keyof typeof this.icons];
  }
}