import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TripsService} from "../trips.service";
import {TripWithBasketInfo} from "../TripWithBasketInfo";
import {Currency} from "../Currency";
import {CurrencyPipe} from "../currency.pipe";
import {FormsModule} from "@angular/forms";
import {Trip} from "../Trip";
import {BehaviorSubject, map} from "rxjs";
import {combineLatest} from "rxjs";
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  constructor(private tripsService: TripsService, private currencyService: CurrencyService) {}

  tripsInBasket: TripWithBasketInfo[] = []
  unselectedTripsSubject: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set<string>())
  totalPrice: number | null = null
  currency: Currency = Currency.PLN

  ngOnInit() {
    this.tripsService.getSelectedTrips()
        .subscribe( data => this.tripsInBasket = data)

    combineLatest(
        [
            this.tripsService.getSelectedTrips(),
            this.unselectedTripsSubject
        ]
    ).pipe(
        map( ([selectedTrips, unselectedIds]) => {
            return selectedTrips.reduce((total, trip) => {
              let count = trip.placesInBasket;
              if(unselectedIds.has(trip.trip.id)) {
                count = 0
              }
              return total + (trip.trip.price * count);
            }, 0);
        })
    )
        .subscribe( data => this.totalPrice = data)

    this.currencyService.getCurrentCurrency()
        .subscribe( data => this.currency = data)
  }

  onTripSelectionChange(tripId: string, isSelected: any) {
    const current: Set<string> = new Set<string>(this.unselectedTripsSubject.getValue())
    if(isSelected.target.checked) {
      current.delete(tripId)
    }
    else {
      current.add(tripId)
    }
    this.unselectedTripsSubject.next(current)
  }

  purchaseSelectedItems() {
    const tripsToPurchase = this.tripsInBasket.filter( data => {
      return !this.unselectedTripsSubject.getValue().has(data.trip.id)
    })

    this.tripsService.purchaseTrips(tripsToPurchase)
  }

  decrementQuantity(trip: Trip) {
      this.tripsService.removeTripFromTheBasket(trip)
  }

  incrementQuantity(trip: Trip) {
    this.tripsService.putTripInTheBasket(trip)
  }
}
