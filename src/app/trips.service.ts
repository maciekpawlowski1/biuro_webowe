import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {Trip} from "./Trip";
import {HttpClient} from "@angular/common/http";
import {TripWithBasketInfo} from "./TripWithBasketInfo";
import {Currency} from "./Currency";

@Injectable({
    providedIn: 'root'
})
export class TripsService {

    constructor(private http: HttpClient) {
    }

    tripsSubject = new BehaviorSubject<Trip[]>([])
    selectedTripsIdSubject = new BehaviorSubject<String[]>([])
    currentCurrencySubject = new BehaviorSubject<Currency>(Currency.PLN)

    getTrips(): Observable<Trip[]> {
        const current = this.tripsSubject.getValue()
        if (current.length == 0) {
            this.fetchTrips()
        }
        return this.tripsSubject.asObservable()
    }

    getTripsWithBasketInfo(): Observable<TripWithBasketInfo[]> {
        this.fetchTrips()
        return combineLatest([this.tripsSubject, this.selectedTripsIdSubject]).pipe(
            map(([trips, selectedIds]) => {
                return trips.map(trip => {
                    const tripWithInfo: TripWithBasketInfo = {
                        trip: trip,
                        placesInBasket: selectedIds.filter(id => id == trip.id).length
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

    getCurrentCurrency(): Observable<Currency> {
        return this.currentCurrencySubject.asObservable()
    }

    fetchTrips(): void {
        this.http.get<Trip[]>('http://localhost:3000/trips').subscribe(data => {
            this.tripsSubject.next(data)
        })
    }

    changeCurrency(newCurrency: Currency) {
        this.currentCurrencySubject.next(newCurrency)
    }

    deleteTrip(trip: Trip) {
        const currentSelectedTrips = [...this.selectedTripsIdSubject.getValue()]
        while (true) {
            const indexInBasket = currentSelectedTrips.indexOf(trip.id)
            if (indexInBasket != -1) {
                currentSelectedTrips.splice(indexInBasket, 1)
            }
            else {
                break
            }
        }
        this.selectedTripsIdSubject.next(currentSelectedTrips)

        const currentTrips = [...this.tripsSubject.getValue()]
        const index = currentTrips.indexOf(trip)
        if (index != -1) {
            currentTrips.splice(index, 1)
            this.tripsSubject.next(currentTrips)
        }
    }
}
