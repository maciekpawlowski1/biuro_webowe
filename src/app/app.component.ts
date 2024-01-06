import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CurrencySelectorComponent} from "./currency-selector/currency-selector.component";
import {CartWidgetComponent} from "./cart-widget/cart-widget.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {TripsService} from "./trips.service";
import {SpinnerComponent} from "./spinner/spinner.component";
import {DataSourceService} from "./data-source.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CurrencySelectorComponent, CartWidgetComponent, NavbarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'biuropawlowski';

  isLoading = true

  constructor(private tripsService: TripsService, private dataSourceService: DataSourceService) {
  }

  ngOnInit(): void {
    this.dataSourceService.loadDataAndObserveLoading().subscribe( isLoading => {
      this.isLoading = isLoading
    })
  }
}
