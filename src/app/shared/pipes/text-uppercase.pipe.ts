import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textUpperCase',
})
export class TextUpperCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
