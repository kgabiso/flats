import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, term: any): any {
    if (term === undefined) return values;

    return values.filter(function (value) {
      return value.name.toLowerCase().includes(term.toLowerCase());
    });
  }

}
