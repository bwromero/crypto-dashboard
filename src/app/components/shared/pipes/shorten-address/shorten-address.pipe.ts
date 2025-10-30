import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenAddress',
  standalone: true
})
export class ShortenAddressPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(!value) return '';
    if (value.length <= 16) return value;
    return `${value.slice(0, 6)}...${value.slice(-8)}`;
  }
}
