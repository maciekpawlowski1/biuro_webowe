import { Routes } from '@angular/router';
import {TripsComponent} from "./trips/trips.component";
import {AddTripComponent} from "./add-trip/add-trip.component";

export const routes: Routes = [
  { path: 'trips', component: TripsComponent },
  { path: 'addTrip', component: AddTripComponent },
];
