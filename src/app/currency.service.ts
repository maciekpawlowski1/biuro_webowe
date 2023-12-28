import {Injectable} from '@angular/core';
import {Currency} from "./Currency";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    currentCurrencySubject = new BehaviorSubject<Currency>(Currency.PLN)

    changeCurrency(newCurrency: Currency) {
        this.currentCurrencySubject.next(newCurrency)
    }

    getCurrentCurrency(): Observable<Currency> {
        return this.currentCurrencySubject.asObservable()
    }
}
