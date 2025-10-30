import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domain',
  standalone: true
})
export class DomainPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';

    try {
      const url = new URL(value);
      return url.hostname.replace(/^www\./, '');
    } catch {
      // If not a valid URL, try simple cleanup
      return value.replace(/^https?:\/\//, '').replace(/^www\./, '');
    }
  }
}
