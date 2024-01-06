import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {TripsService} from "./trips.service";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  private isFirebaseChosen = new BehaviorSubject(false)
  private isLoading = new BehaviorSubject(false)
  constructor(private tripsService: TripsService) { }

  loadDataAndObserveLoading(): Observable<boolean> {
    return this.isFirebaseChosen.pipe(
      switchMap((isFirebase: boolean) => {
          this.isLoading.next(true)
          this.tripsService.reset().then( () => this.isLoading.next(false))
          return this.isLoading.asObservable()
        }
      )
    )
  }

  getIsFirebaseChosen(): boolean {
    return this.isFirebaseChosen.value
  }

  changeDataSource(isFirebaseChosen: boolean) {
    if(this.isFirebaseChosen.value != isFirebaseChosen) {
      this.isFirebaseChosen.next(isFirebaseChosen)
    }
  }
}
