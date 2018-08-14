import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({
    name: 'OrderBy',
    pure:false
})
export class OrderByPipe implements PipeTransform {
  transform(values) {
    return values.reverse();
  }
}