import {Component, OnInit} from '@angular/core';
import {Trip} from "../Trip";
import {TripsService} from "../trips.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  constructor(private tripsService: TripsService) {}

  trips: Trip[] = []

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
