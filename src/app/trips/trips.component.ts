import {Component, OnInit} from '@angular/core';
import {Trip} from "../Trip";
import {TripsService} from "../trips.service";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {TripWithBasketInfo} from "../TripWithBasketInfo";

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  constructor(private tripsService: TripsService) {}

  trips: TripWithBasketInfo[] = []
  maxPrice: number | undefined
  minPrice: number | undefined

  book(trip: Trip) {
    this.tripsService.putTripInTheBasket(trip)
  }

  cancel(trip: Trip) {
      this.tripsService.removeTripFromTheBasket(trip)
  }

  ngOnInit(): void {
    this.tripsService.getTripsWithBasketInfo().subscribe(data => {
      // console.log(JSON.stringify(data))
      this.trips = data
      this.maxPrice = data.reduce((max, obj) => obj.trip.price > max ? obj.trip.price : max, data[0].trip.price)
      this.minPrice = data.reduce((min, obj) => obj.trip.price < min ? obj.trip.price : min, data[0].trip.price)

    })
  }
}
