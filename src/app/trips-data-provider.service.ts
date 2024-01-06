import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {Trip} from "./Trip";
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc} from "@angular/fire/firestore";
import {DataSourceService} from "./data-source.service";

@Injectable({
  providedIn: 'root',
})
export class TripsDataProvider {

  constructor(private http: HttpClient, private firestore: Firestore, private injector: Injector) {
    this.tripsCollection = collection(this.firestore, 'trips');
  }

  private apiUrl = 'http://localhost:3000/trips';

  private readonly tripsCollection;

  async getTrips(): Promise<Trip[]> {
    if(this.shouldTakeFromFirebase()) {
      return firstValueFrom(collectionData(this.tripsCollection, { idField: 'id' }) as Observable<Trip[]>);
    } else {
      return await firstValueFrom(this.http.get<Trip[]>(this.apiUrl))
    }
  }

  async deleteTrip(tripId: string): Promise<void> {
    if(this.shouldTakeFromFirebase()) {
      const tripDoc = doc(this.firestore, `trips/${tripId}`);
      await deleteDoc(tripDoc);
    }
    else {
      await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${tripId}`))
    }
  }

  async addTrip(trip: Trip): Promise<void> {
    if(this.shouldTakeFromFirebase()) {
      await addDoc(this.tripsCollection, trip);
    }
    else {
      await firstValueFrom(this.http.post<void>(this.apiUrl, trip))
    }
  }

  shouldTakeFromFirebase(): boolean {
    const dataSourceService = this.injector.get(DataSourceService)
    return dataSourceService.getIsFirebaseChosen()
  }
}
