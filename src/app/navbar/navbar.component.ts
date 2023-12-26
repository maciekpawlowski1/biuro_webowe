import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CartWidgetComponent} from "../cart-widget/cart-widget.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CartWidgetComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
