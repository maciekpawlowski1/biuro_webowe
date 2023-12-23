import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Trip} from "./Trip";
import {HttpClient} from "@angular/common/http";

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

  fetchTrips() {
    this.http.get<Trip[]>('http://localhost:3000/trips').subscribe( data => {
      this.tripsSubject.next(data)
    })
  }
}
