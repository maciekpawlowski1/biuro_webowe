import { Routes } from '@angular/router';
import {TripsComponent} from "./trips/trips.component";
import {AddTripComponent} from "./add-trip/add-trip.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {TripDetailsComponent} from "./trip-details/trip-details.component";

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'addTrip', component: AddTripComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'trips/:id', component: TripDetailsComponent }
];
