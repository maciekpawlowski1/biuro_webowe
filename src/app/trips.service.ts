import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, firstValueFrom, map, Observable, skipWhile} from "rxjs";
import {Trip} from "./Trip";
import {TripWithBasketInfo} from "./TripWithBasketInfo";
import {TripFilters} from "./TripFilters";
import {TripsDataProvider} from "./trips-data-provider.service";

@Injectable({
    providedIn: 'root'
})
export class TripsService {

    constructor(private tripsDataProvider: TripsDataProvider) {
    }

    tripsSubject = new BehaviorSubject<Trip[]>([])
    selectedTripsIdSubject = new BehaviorSubject<string[]>([])

    getTrips(): Observable<Trip[]> {
        return this.tripsSubject.asObservable()
    }

    getSelectedTripsCount(): Observable<number> {
        return this.selectedTripsIdSubject.asObservable()
            .pipe(
                map(data => data.length)
            )
    }

    getSelectedTripsValue(): Observable<number> {
        return this.getSelectedTrips()
            .pipe(
                map(trips => {
                    return trips.reduce((total, trip) => {
                        const count = trip.placesInBasket;
                        return total + (trip.trip.price * count);
                    }, 0);
                })
            )
    }

    getSelectedTrips(): Observable<TripWithBasketInfo[]> {
        return this.getTripsWithBasketInfo(null).pipe(
            map(data => {
                return data.filter(tripWithCount => tripWithCount.placesInBasket > 0)
            })
        )
    }

    getTripsWithBasketInfo(filters: TripFilters | null): Observable<TripWithBasketInfo[]> {
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

    getPriceRangeOfTrips(): Promise<number[]> {
        return firstValueFrom(
            this.getTrips().pipe(
                skipWhile(data => {
                        return data.length == 0;
                    }
                ),
                map(trips => {
                    const prices = trips.map(trip => {
                        return trip.price
                    })

                    const minVal = Math.min(...prices);
                    const maxVal = Math.max(...prices);

                    return [minVal, maxVal]
                }),
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


    async fetchTrips(): Promise<void> {
        const data = await this.tripsDataProvider.getTrips();
        this.tripsSubject.next(data);
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

    addTrip(trip: Trip): Promise<void> {
        return this.tripsDataProvider.addTrip(trip)
            .then( data => {
                const currentTrips = [...this.tripsSubject.getValue()]
                currentTrips.push(trip)
                this.tripsSubject.next(currentTrips)
            })
    }

    purchaseTrips(tripsToPurchase: TripWithBasketInfo[]) {
        tripsToPurchase.forEach(trip => {
            const currentSelectedTrips = [...this.selectedTripsIdSubject.getValue()]
            while (true) {
                const indexInBasket = currentSelectedTrips.indexOf(trip.trip.id)
                if (indexInBasket != -1) {
                    currentSelectedTrips.splice(indexInBasket, 1)
                } else {
                    break
                }
            }
            this.selectedTripsIdSubject.next(currentSelectedTrips)
        })
    }

    getTripById(tripId: string): Observable<TripWithBasketInfo> {
        return combineLatest([this.tripsSubject, this.selectedTripsIdSubject])
            .pipe(
                map(([trips, selectedIds]) => {
                    const trip = trips.find(t => t.id === tripId)
                    if (trip === undefined) {
                        throw 1
                    }
                    const count = selectedIds.filter(id => id === tripId).length
                    const result: TripWithBasketInfo = {
                        trip: trip,
                        placesInBasket: count
                    }

                    return result
                })
            )
    }
}
