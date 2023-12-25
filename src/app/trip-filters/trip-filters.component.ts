import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import { TripFilters } from '../TripFilters';

@Component({
  selector: 'app-trip-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './trip-filters.component.html',
  styleUrl: './trip-filters.component.css'
})
export class TripFiltersComponent {
  @Output() onFiltersChange = new EventEmitter<TripFilters>
  filterForm: FormGroup;

  availableCountries = ['Polska', 'Niemcy', 'Włochy'];
  availableRatings = [1, 2, 3, 4, 5];

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      country: [[]],
      minDate: [''],
      maxDate: [''],
      minPrice: [],
      maxPrice: [],
      rating: [[]]
    });
  }

  onCountryChange(country: string, event: any) {
    const countries = this.filterForm.value.country || [];
    if (event.target.checked) {
      countries.push(country);
    } else {
      const index = countries.indexOf(country);
      if (index > -1) {
        countries.splice(index, 1);
      }
    }
    this.filterForm.patchValue({ country: countries });
  }

  onRatingChange(rating: number, event: any) {
    const ratings = this.filterForm.value.rating || [];
    if (event.target.checked) {
      ratings.push(rating);
    } else {
      const index = ratings.indexOf(rating);
      if (index > -1) {
        ratings.splice(index, 1);
      }
    }
    this.filterForm.patchValue({ rating: ratings });
  }

  applyFilters() {
    //console.log(this.filterForm.value);
    this.onFiltersChange.emit(this.filterForm.value)
  }
}
