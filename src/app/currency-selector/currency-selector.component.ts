import { Component } from '@angular/core';
import {TripsService} from "../trips.service";
import {Currency} from "../Currency";
import {FormsModule} from "@angular/forms";
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.css'
})
export class CurrencySelectorComponent {
  newCurrency: String = "PLN";

  constructor(private currencyService: CurrencyService) {
  }
  changeCurrency() {
    let currencyToChange;

    switch (this.newCurrency) {
      case "PLN":
        currencyToChange = Currency.PLN;
        break;
      case "EUR":
        currencyToChange = Currency.EUR;
        break;
      case "USD":
        currencyToChange = Currency.USD;
        break;
      default:
        currencyToChange = Currency.PLN;
    }

    this.currencyService.changeCurrency(currencyToChange);
  }
}
