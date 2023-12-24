import {Component, OnInit} from '@angular/core';
import {Trip} from "../Trip";
import {TripsService} from "../trips.service";
import {DatePipe, NgClass, NgForOf, UpperCasePipe} from "@angular/common";
import {TripWithBasketInfo} from "../TripWithBasketInfo";
import {CurrencyPipe} from "../currency.pipe";
import {combineLatest} from "rxjs";
import {Currency} from "../Currency";

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgClass,
    UpperCasePipe,
    CurrencyPipe,
    CurrencyPipe,
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  constructor(private tripsService: TripsService) {}

  trips: TripWithBasketInfo[] = []
  maxPrice: number | undefined
  minPrice: number | undefined
  currency: Currency = Currency.PLN

  book(trip: Trip) {
    this.tripsService.putTripInTheBasket(trip)
  }

  cancel(trip: Trip) {
      this.tripsService.removeTripFromTheBasket(trip)
  }

  deleteTrip(trip: Trip) {
    this.tripsService.deleteTrip(trip)
  }

  ngOnInit(): void {
    combineLatest([this.tripsService.getTripsWithBasketInfo(), this.tripsService.getCurrentCurrency()])
        .subscribe(([newTrips, newCurrency]) => {
      // console.log(JSON.stringify(data))
      this.trips = newTrips
      this.maxPrice = newTrips.reduce((max, obj) => obj.trip.price > max ? obj.trip.price : max, newTrips[0].trip.price)
      this.minPrice = newTrips.reduce((min, obj) => obj.trip.price < min ? obj.trip.price : min, newTrips[0].trip.price)
      this.currency = newCurrency
    })
  }
}
