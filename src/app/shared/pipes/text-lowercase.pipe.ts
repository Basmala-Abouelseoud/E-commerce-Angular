import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLowerCase',
})
export class TextLowerCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase();
  }
}
