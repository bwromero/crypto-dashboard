import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/shared/components/modal/modal.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, ModalComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crypto-dashboard';
}
