import {Pipe, PipeTransform} from '@angular/core';
import {Currency} from "./Currency";

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, currency: Currency): string {
    switch (currency) {
      case Currency.EUR:
        return Math.round((value as number) * 0.22) + ' ' + 'EUR';
      case Currency.USD:
        return '$' + Math.round((value as number) * 0.27) + ' ';
      case Currency.PLN:
        return value + ' PLN';
    }
  }
}
