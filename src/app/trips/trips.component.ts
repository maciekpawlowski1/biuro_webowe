import {Component, OnInit} from '@angular/core';
import {Trip} from "../Trip";
import {TripsService} from "../trips.service";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  constructor(private tripsService: TripsService) {}

  trips: Trip[] = []
  maxPrice = 999999
  minPrice = 0

  book(trip: Trip) {

  }

  cancel(trip: Trip) {

  }

  ngOnInit(): void {
    console.log('Trips ngOnInit')
    this.tripsService.getTrips().subscribe(data => {
      this.trips = data
    })
  }
}
