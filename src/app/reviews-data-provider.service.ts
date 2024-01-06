import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {Review} from "./Review";
import {DataSourceService} from "./data-source.service";
import {addDoc, collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ReviewsDataProvider {

  private readonly reviewsCollection;

  constructor(private http: HttpClient, private dataSourceService: DataSourceService, private firestore: Firestore) {
    this.reviewsCollection = collection(this.firestore, 'reviews');
  }

  private apiUrl = 'http://localhost:3000';

  getReviews(tripId: string): Promise<Review[]> {
    if(this.dataSourceService.getIsFirebaseChosen()) {
      const reviewsQuery = query(collection(this.firestore, 'reviews'), where('tripId', '==', tripId));
      return firstValueFrom(collectionData(reviewsQuery, { idField: 'id' }) as Observable<Review[]>);
    }
    else {
      return firstValueFrom(this.http.get<Review[]>(`${this.apiUrl}/trips/${tripId}/reviews`))
    }
  }

  async addReview(review: Review): Promise<void> {
    if(this.dataSourceService.getIsFirebaseChosen()) {
      await addDoc(this.reviewsCollection, review);
    }
    else {
      await firstValueFrom(this.http.post<any>(`${this.apiUrl}/reviews`, review))
    }
  }
}
