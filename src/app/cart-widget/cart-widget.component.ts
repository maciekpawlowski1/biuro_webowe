import {Component, OnInit} from '@angular/core';
import {Currency} from "../Currency";
import {CurrencyPipe} from "../currency.pipe";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {TripsService} from "../trips.service";
import {combineLatest} from "rxjs";

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
    currency = Currency.PLN
    protected readonly faCartShopping = faCartShopping;

    constructor(private tripsService: TripsService) {
        combineLatest(
            [
                tripsService.getSelectedTripsCount(),
                tripsService.getSelectedTripsValue(),
            ]
        ).subscribe(([tripsCount, totalPrice]) => {
            this.totalPrice = totalPrice
            this.totalTrips = tripsCount
        })
    }

    ngOnInit(): void {

    }
}
