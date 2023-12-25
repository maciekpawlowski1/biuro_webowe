import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, firstValueFrom, map, Observable, skip, skipWhile} from "rxjs";
import {Trip} from "./Trip";
import {HttpClient} from "@angular/common/http";
import {TripWithBasketInfo} from "./TripWithBasketInfo";
import {Currency} from "./Currency";
import {TripFilters} from "./TripFilters";

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

    getTripsWithBasketInfo(filters: TripFilters | null): Observable<TripWithBasketInfo[]> {
        const current = this.tripsSubject.getValue()
        if (current.length == 0) {
            this.fetchTrips()
        }
        return combineLatest([this.tripsSubject, this.selectedTripsIdSubject]).pipe(
            map(([trips, selectedIds]) => {
                return trips.map(trip => {
                    const tripWithInfo: TripWithBasketInfo = {
                        trip: trip,
                        placesInBasket: selectedIds.filter(id => id == trip.id).length
                    }
                    return tripWithInfo
                })
            }),
            map(trips => {
                if (filters === null) {
                    return trips
                } else {
                    return this.filterTrips(trips, filters);
                }
            })
        )
    }

    getCountOfTripsForGivenFilter(filters: TripFilters): Observable<number> {
        return this.getTripsWithBasketInfo(filters).pipe(
            map(trips => {
                    return trips.length
                }
            ),
        )
    }

    getCountriesOfTrips(): Promise<string[]> {
        return firstValueFrom(
            this.getTrips().pipe(
                map(trips => {
                    return trips.map(trip => {
                        return trip.country
                    })
                }),
                skipWhile(data => {
                        return data.length == 0;
                    }
                )
            )
        )
    }

    private filterTrips(trips: TripWithBasketInfo[], filters: TripFilters): TripWithBasketInfo[] {
        return trips.filter(trip => {
            let countryOk = filters.country.length === 0 || filters.country.includes(trip.trip.country);

            let minDateOk = filters.minDate.length === 0 || new Date(trip.trip.startDate) >= new Date(filters.minDate);

            let maxDateOk = filters.maxDate.length === 0 || new Date(trip.trip.endDate) <= new Date(filters.maxDate);

            let minPriceOk = filters.minPrice === null || trip.trip.price >= filters.minPrice;

            let maxPriceOk = filters.maxPrice === null || trip.trip.price <= filters.maxPrice;

            let ratingOk = filters.rating.length === 0 || filters.rating.includes(trip.trip.rating);

            return countryOk && minDateOk && maxDateOk && minPriceOk && maxPriceOk && ratingOk;
        });
    }

    putTripInTheBasket(trip: Trip) {
        const current = [...this.selectedTripsIdSubject.getValue()]
        current.push(trip.id)
        this.selectedTripsIdSubject.next(current)
    }

    removeTripFromTheBasket(trip: Trip) {
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
            } else {
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

    addTrip(trip: Trip) {
        const currentTrips = [...this.tripsSubject.getValue()]
        currentTrips.push(trip)
        this.tripsSubject.next(currentTrips)
    }
}
