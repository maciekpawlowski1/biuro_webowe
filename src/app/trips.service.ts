import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {Trip} from "./Trip";
import {HttpClient} from "@angular/common/http";
import {TripWithBasketInfo} from "./TripWithBasketInfo";

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  tripsSubject = new BehaviorSubject<Trip[]>([])
  selectedTripsIdSubject = new BehaviorSubject<String[]>([])

  getTrips(): Observable<Trip[]> {
    const current = this.tripsSubject.getValue()
    if(current.length == 0) {
      this.fetchTrips()
    }
    return this.tripsSubject.asObservable()
  }

  getTripsWithBasketInfo(): Observable<TripWithBasketInfo[]> {
    this.fetchTrips()
    return combineLatest([this.tripsSubject, this.selectedTripsIdSubject]).pipe(
      map(([trips, selectedIds]) => {
        return trips.map( trip => {
          const tripWithInfo: TripWithBasketInfo = {
            trip: trip,
            placesInBasket: selectedIds.filter( id => id == trip.id).length
          }
          return tripWithInfo
        })
      })
    )
  }

  putTripInTheBasket(trip: Trip) {
    console.log('Adding trip to basket')
    const current = [...this.selectedTripsIdSubject.getValue()]
    current.push(trip.id)
    this.selectedTripsIdSubject.next(current)
  }

    removeTripFromTheBasket(trip: Trip) {
        console.log('Removing trip from basket')
        const current = [...this.selectedTripsIdSubject.getValue()]
        const index = current.indexOf(trip.id)
        if (index !== -1) {
            current.splice(index, 1);
        }
        this.selectedTripsIdSubject.next(current)
    }

  fetchTrips(): void {
    this.http.get<Trip[]>('http://localhost:3000/trips').subscribe( data => {
      this.tripsSubject.next(data)
    })
  }
}
