import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Trip} from "../Trip";
import {TripsService} from "../trips.service";
import * as uuid from 'uuid';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {

  nameFormControl = new FormControl(null, Validators.required);
  countryFormControl = new FormControl(null, Validators.required);
  startDateFormControl = new FormControl(null, Validators.required);
  endDateFormControl = new FormControl(null, Validators.required);
  priceFormControl = new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]);
  availableSeatsFormControl = new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]);
  descriptionFormControl = new FormControl(null, Validators.required);
  imageFormControl = new FormControl(null, Validators.required);
  wasContinueClicked = false

  tripForm: FormGroup = new FormGroup({
    'name': this.nameFormControl,
    'country': this.countryFormControl,
    'startDate': this.startDateFormControl,
    'endDate': this.endDateFormControl,
    'price': this.priceFormControl,
    'availableSeats': this.availableSeatsFormControl,
    'description': this.descriptionFormControl,
    'image': this.imageFormControl
  });

  constructor(private tripsService: TripsService, private router: Router) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.wasContinueClicked = true;
    if(this.tripForm.valid) {
      const newTrip: Trip = this.tripForm.value

      newTrip.id = uuid.v4()
      this.tripsService.addTrip(newTrip)

      this.router.navigate(['/trips']);
    }
  }

  shouldShowError(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched || this.wasContinueClicked)
  }
}
