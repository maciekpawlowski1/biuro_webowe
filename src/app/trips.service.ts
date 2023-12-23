import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Trip} from "./Trip";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>('http://localhost:3000/trips');
  }
}
