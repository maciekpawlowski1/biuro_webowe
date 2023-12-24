import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-trip-rating',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    FaIconComponent
  ],
  templateUrl: './trip-rating.component.html',
  styleUrl: './trip-rating.component.css'
})
export class TripRatingComponent {
  @Input() rating: number = 3;
  maxRating = 5;
  @Output() ratingChange = new EventEmitter<number>();

  rate(ratingValue: number) {
    this.rating = ratingValue;
    this.ratingChange.emit(this.rating);
  }

  protected readonly faStarSolid = faStarSolid;
  protected readonly faStarRegular = faStarRegular;
}
