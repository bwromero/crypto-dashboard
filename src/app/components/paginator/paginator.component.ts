import { Component } from '@angular/core';
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

  pages: number[] = [1, 2, 3, 4];

}
