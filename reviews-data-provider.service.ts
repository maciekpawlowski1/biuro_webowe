import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Review} from "./src/app/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewsDataProvider {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/reviews';

  getReviews(): Promise<Review[]> {
    return firstValueFrom(this.http.get<Review[]>(this.apiUrl))
  }

  addReview(review: Review): Promise<void> {
    return firstValueFrom(this.http.post<void>(this.apiUrl, JSON.stringify(review)))
  }
}
