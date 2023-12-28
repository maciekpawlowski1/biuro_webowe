import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CurrencySelectorComponent} from "./currency-selector/currency-selector.component";
import {CartWidgetComponent} from "./cart-widget/cart-widget.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {TripsService} from "./trips.service";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, CurrencySelectorComponent, CartWidgetComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'biuropawlowski';

  constructor(private tripsService: TripsService) {
  }

  ngOnInit(): void {
    this.tripsService.fetchTrips()
  }
}
