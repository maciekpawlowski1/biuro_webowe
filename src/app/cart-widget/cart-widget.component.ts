import {Component, OnInit} from '@angular/core';
import {Currency} from "../Currency";
import {CurrencyPipe} from "../currency.pipe";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {TripsService} from "../trips.service";
import {combineLatest} from "rxjs";
import {Router} from "@angular/router";
import {CurrencyService} from "../currency.service";

@Component({
    selector: 'app-cart-widget',
    standalone: true,
    imports: [
        CurrencyPipe,
        FaIconComponent
    ],
    templateUrl: './cart-widget.component.html',
    styleUrl: './cart-widget.component.css'
})
export class CartWidgetComponent implements OnInit {
    totalTrips: number | null = null
    totalPrice: number | null = null
    currency: Currency = Currency.PLN
    protected readonly faCartShopping = faCartShopping;

    constructor(
        private tripsService: TripsService,
        private currencyService: CurrencyService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        combineLatest(
            [
                this.tripsService.getSelectedTripsCount(),
                this.tripsService.getSelectedTripsValue(),
                this.currencyService.getCurrentCurrency(),
            ]
        ).subscribe(([tripsCount, totalPrice, currency]) => {
            this.totalPrice = totalPrice
            this.totalTrips = tripsCount
            this.currency = currency
        })
    }

    onCartClick() {
        this.router.navigate(['/cart']);
    }
}
