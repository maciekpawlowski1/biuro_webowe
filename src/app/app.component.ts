import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CurrencySelectorComponent} from "./currency-selector/currency-selector.component";
import {CartWidgetComponent} from "./cart-widget/cart-widget.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, CurrencySelectorComponent, CartWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biuropawlowski';
}
