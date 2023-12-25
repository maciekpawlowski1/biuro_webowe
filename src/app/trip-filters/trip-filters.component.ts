import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TripFilters} from '../TripFilters';
import {debounceTime, switchMap} from "rxjs";
import {TripsService} from "../trips.service";
import {NgxSliderModule, Options} from "ngx-slider-v2";

@Component({
    selector: 'app-trip-filters',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgxSliderModule
    ],
    templateUrl: './trip-filters.component.html',
    styleUrl: './trip-filters.component.css'
})
export class TripFiltersComponent implements OnInit {
    @Output() onFiltersChange = new EventEmitter<TripFilters>
    filterForm: FormGroup;

    availableCountries: string[] | null = null;
    availableRatings = [1, 2, 3, 4, 5];

    resultsForGivenFilters: number | null = null

    sliderOptions: Options = {
        floor: 0,
        ceil: 10000
    };

    constructor(private formBuilder: FormBuilder, private tripsService: TripsService) {
        this.filterForm = this.formBuilder.group({
            country: [[]],
            minDate: [''],
            maxDate: [''],
            priceRange: [[0, 200]],
            rating: [[]]
        });
    }

    ngOnInit(): void {
        this.tripsService.getCountriesOfTrips().then(data => {
            this.availableCountries = data
        })

        this.tripsService.getPriceRangeOfTrips().then(data => {
                this.sliderOptions = {
                    floor: data[0],
                    ceil: data[1]
                }
                this.filterForm.patchValue({priceRange: data})
            }
        )

        this.filterForm.valueChanges.pipe(
            debounceTime(50),
            switchMap((currentFilters: TripFilters, index: number) => {
                    const filters = this.formToFilters(currentFilters)
                    return this.tripsService.getCountOfTripsForGivenFilter(filters)
                }
            )
        ).subscribe(count => {
            this.resultsForGivenFilters = count
        })
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
        this.filterForm.patchValue({country: countries});
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
        this.filterForm.patchValue({rating: ratings});
    }

    applyFilters() {
        const currentFilters = this.filterForm.value
        this.onFiltersChange.emit(
            this.formToFilters(currentFilters)
        )
    }

    private formToFilters(currentFilters: any): TripFilters {
        return {
            country: currentFilters.country,
            minDate: currentFilters.minDate,
            maxDate: currentFilters.maxDate,
            minPrice: currentFilters.priceRange[0],
            maxPrice: currentFilters.priceRange[1],
            rating: currentFilters.rating,
        }
    }
}
