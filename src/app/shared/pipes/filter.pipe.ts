import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItems',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, key:string ): any[] {
    return items.filter((item) =>
      item[key].toLowerCase().includes(searchText.toLowerCase()),
    );
  }
}
