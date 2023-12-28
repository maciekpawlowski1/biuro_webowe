import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CurrencySelectorComponent} from "./currency-selector/currency-selector.component";
import {CartWidgetComponent} from "./cart-widget/cart-widget.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {TripsService} from "./trips.service";
import {SpinnerComponent} from "./spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CurrencySelectorComponent, CartWidgetComponent, NavbarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'biuropawlowski';

  isLoading = false

  constructor(private tripsService: TripsService) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.tripsService.fetchTrips()
        .finally(() => {
            this.isLoading = false
        })
  }
}
