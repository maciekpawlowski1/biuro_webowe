import {Component, OnInit} from '@angular/core';
import {TripWithBasketInfo} from "../TripWithBasketInfo";
import {Currency} from "../Currency";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TripsService} from "../trips.service";
import {switchMap} from "rxjs";
import {CurrencyPipe} from "../currency.pipe";
import {TripRatingComponent} from "../trip-rating/trip-rating.component";
import {NgForOf, NgIf} from "@angular/common";
import {ReviewsComponent} from "../reviews/reviews.component";

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    TripRatingComponent,
    NgIf,
    NgForOf,
    ReviewsComponent
  ],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent implements OnInit {
  trip: TripWithBasketInfo | null = null
  images: string[] = [
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]

  currency: Currency = Currency.PLN

  constructor(private route: ActivatedRoute, private tripsService: TripsService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const tripId = params.get('id');
        return this.tripsService.getTripById(tripId)
      })
    ).subscribe(data => this.trip = data)

    this.tripsService.getCurrentCurrency()
      .subscribe(data => this.currency = data)
  }

  addToBasketTrip() {

  }

  removeFromBasketTrip() {

  }
}
