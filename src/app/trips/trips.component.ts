import {Component, OnInit} from '@angular/core';
import {Trip} from "../Trip";
import {TripsService} from "../trips.service";
import {DatePipe, NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {TripWithBasketInfo} from "../TripWithBasketInfo";
import {CurrencyPipe} from "../currency.pipe";
import {BehaviorSubject, combineLatest, Observable, switchMap} from "rxjs";
import {Currency} from "../Currency";
import {TripRatingComponent} from "../trip-rating/trip-rating.component";
import {ModalComponent} from "../modal/modal.component";
import {TripFiltersComponent} from "../trip-filters/trip-filters.component";
import {TripFilters} from "../TripFilters";
import {Router} from "@angular/router";
import {CurrencyService} from "../currency.service";

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
    TripRatingComponent,
    ModalComponent,
    TripFiltersComponent,
    NgIf,
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  constructor(
      private tripsService: TripsService,
      private currencyService: CurrencyService,
      private router: Router,
  ) {}

  showFiltersModal = false
  filters = new BehaviorSubject<TripFilters | null>(null)
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

    combineLatest([this.getFilteredTrips(), this.currencyService.getCurrentCurrency()])
        .subscribe(([newTrips, newCurrency]) => {
      // console.log(JSON.stringify(data))
      this.trips = newTrips
      if(newTrips.length != 0) {
        this.maxPrice = newTrips.reduce((max, obj) => obj.trip.price > max ? obj.trip.price : max, newTrips[0].trip.price)
        this.minPrice = newTrips.reduce((min, obj) => obj.trip.price < min ? obj.trip.price : min, newTrips[0].trip.price)
      }
      this.currency = newCurrency
    })
  }

  onFiltersChange($event: TripFilters) {
    this.showFiltersModal = false
    this.filters.next($event)
  }

  private getFilteredTrips(): Observable<TripWithBasketInfo[]> {
    return this.filters.asObservable().pipe(
        switchMap( (filters: TripFilters | null, index: number) => {
          return this.tripsService.getTripsWithBasketInfo(filters)
        })
    );
  }

  onTripClick(trip: Trip) {
    this.router.navigate(['trips', trip.id]);
  }
}
