import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Review} from "../Review";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReviewsDataProvider} from "../reviews-data-provider.service";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {

  constructor(private reviewsDataProvider: ReviewsDataProvider) {
  }

  @Input() tripId: string = "";

  ngOnInit(): void {
      if(this.tripId.length > 0) {
        this.reviewsDataProvider.getReviews(this.tripId).then(data => {
          this.reviews = data
        })
      }
  }

  reviewForm: FormGroup = new FormGroup({
    'nickname': new FormControl(null, Validators.required),
    'reviewText': new FormControl(null, [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500)
    ]),
    'purchaseDate': new FormControl(null)
  });
  reviews: Review[] = [];


  onSubmit() {
    if (this.reviewForm.valid) {
      const review = {
        tripId: this.tripId,
        nickname: this.reviewForm.value.nickname,
        reviewText: this.reviewForm.value.reviewText,
        purchaseDate: this.reviewForm.value.purchaseDate
      }
      this.reviews.push(review);
      this.reviewForm.reset();
      this.reviewsDataProvider.addReview(review).then( data => {
        console.log('Review added successfully')
      })
    } else {
      this.reviewForm.markAllAsTouched()
    }
  }
}
