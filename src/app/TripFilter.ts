export interface TripFilter {
    country: string;
    minDate: string;
    maxDate: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
}
