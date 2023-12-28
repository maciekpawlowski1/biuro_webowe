import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Trip} from "./Trip";

@Injectable({
  providedIn: 'root'
})
export class TripsDataProvider {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/trips';

  getTrips(): Promise<Trip[]> {
    return firstValueFrom(this.http.get<Trip[]>(this.apiUrl))
  }

  deleteTrip(tripId: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${tripId}`))
  }

  addTrip(trip: Trip): Promise<void> {
    return firstValueFrom(this.http.post<void>(this.apiUrl, trip))
  }
}
