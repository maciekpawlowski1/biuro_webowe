import { Routes } from '@angular/router';
import {TripsComponent} from "./trips/trips.component";
import {AddTripComponent} from "./add-trip/add-trip.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";

export const routes: Routes = [
  { path: 'trips', component: TripsComponent },
  { path: 'addTrip', component: AddTripComponent },
  { path: 'cart', component: ShoppingCartComponent },
];
