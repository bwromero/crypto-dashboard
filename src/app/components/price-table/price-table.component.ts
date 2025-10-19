import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ButtonComponent, DropdownOption } from '../../components/button/button.component';
@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [SearchBarComponent, ButtonComponent],
  templateUrl: './price-table.component.html',
  styles: ``
})
export class PriceTableComponent {

 
}
