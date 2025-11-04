import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-tabs',
    imports: [],
    templateUrl: './tabs.component.html',
    styles: ``
})
export class TabsComponent {
  @Input() tabs: string[] = [];
  @Input() activeTab: string = '';
  @Output() activeTabChange = new EventEmitter<string>();

  changeTab(tab: string): void {
    this.activeTabChange.emit(tab);
  }
}
