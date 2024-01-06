import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CartWidgetComponent} from "../cart-widget/cart-widget.component";
import {CurrencySelectorComponent} from "../currency-selector/currency-selector.component";
import {SourceSelectorComponent} from "../source-selector/source-selector.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CartWidgetComponent,
    CurrencySelectorComponent,
    SourceSelectorComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
