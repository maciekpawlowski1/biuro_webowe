import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Review} from "./Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewsDataProvider {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000';

  getReviews(tripId: string): Promise<Review[]> {
    return firstValueFrom(this.http.get<Review[]>(`${this.apiUrl}/trips/${tripId}/reviews`))
  }

  addReview(review: Review): Promise<void> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/reviews`, review))
  }
}
