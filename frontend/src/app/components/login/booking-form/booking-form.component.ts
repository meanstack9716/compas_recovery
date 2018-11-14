import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-booking-form",
  templateUrl: "./booking-form.component.html",
  styleUrls: ["./booking-form.component.css"]
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<BookingFormComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createBookingForm();
  }

  createBookingForm() {
    this.bookingForm = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          companyName: [null],
          name: [null, Validators.compose([Validators.required])],
          phone: [null, Validators.compose([Validators.required])],
          email: [null, Validators.compose([Validators.email])],
          postCode: [null],
          flatNo: [null],
          houseNo: [null, Validators.compose([Validators.required])],
          street: [null, Validators.compose([Validators.required])],
          city: [null, Validators.compose([Validators.required])]
        }),
        this.formBuilder.group({
          registrationNumber: [null, Validators.compose([Validators.required])],
          make: [null, Validators.compose([Validators.required])],
          model: [null, Validators.compose([Validators.required])],
          wheelDrive: [null],
          van: [null],
          loaded: [null],
          loadedType: [null],
        }),
        this.formBuilder.group({
          registrationNumber: [null, Validators.compose([Validators.required])],
          make: [null, Validators.compose([Validators.required])],
          model: [null, Validators.compose([Validators.required])],
          wheelDrive: [null],
          van: [null],
          loaded: [null],
          loadedType: [null],
        }),
        this.formBuilder.group({
          registrationNumber: [null, Validators.compose([Validators.required])],
          make: [null, Validators.compose([Validators.required])],
          model: [null, Validators.compose([Validators.required])],
          wheelDrive: [null],
          van: [null],
          loaded: [null],
          loadedType: [null],
        })
      ])
    });
  }

  close(data?) {
    this.dialogRef.close(data);
  }

  get formArray(): AbstractControl | null {
    return this.bookingForm.get("formArray");
  }
}
