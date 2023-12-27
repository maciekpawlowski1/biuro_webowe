import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Review} from "../Review";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

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
export class ReviewsComponent {
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
      this.reviews.push(new Review(
        this.reviewForm.value.nickname,
        this.reviewForm.value.reviewText,
        this.reviewForm.value.purchaseDate
      ));
      this.reviewForm.reset();
    } else {
      this.reviewForm.markAllAsTouched()
    }
  }
}
