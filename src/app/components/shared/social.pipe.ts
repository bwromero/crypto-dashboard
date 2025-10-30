import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'social',
  standalone: true
})
export class SocialPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
