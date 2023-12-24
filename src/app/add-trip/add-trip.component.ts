import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Trip} from "../Trip";

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


  ngOnInit() {

  }

  onSubmit() {
    this.wasContinueClicked = true;
    if(this.tripForm.valid) {
      /*const newTrip: Trip = {
        id: uuidv4(),
        name: this.tripForm.ge,
        country: formValues.country,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        price: formValues.price,
        availableSeats: formValues.availableSeats,
        description: formValues.description,
        image: formValues.image
      }*/
    }
  }

  shouldShowError(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched || this.wasContinueClicked)
  }
}
