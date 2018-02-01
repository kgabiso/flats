import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterPipe',
})
export class FilterPipe {
  transform(value, args) {
    if (!args[0]) {
      return value;
    } else if (value) {
      return value.filter(item => {
        for (const key in item) {
          if ((typeof item[key] === 'string' || item[key] instanceof String) &&
            (item[key].indexOf(args[0] !== -1))) {
            return true;
          }
        }
      });
    }
  }
}
