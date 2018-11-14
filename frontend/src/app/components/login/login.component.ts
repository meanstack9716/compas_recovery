import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material";
import { BookingFormComponent } from "src/app/components/login/booking-form/booking-form.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginEnabled: boolean = true;
  registerForm: FormGroup;
  registerEnabled: boolean;
  bookingFormDialog: MatDialogRef<BookingFormComponent>;
  bookingEnabled: boolean;
  apiInProgress: boolean;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      con_password: [null, Validators.compose([Validators.required])]
    });
  }

  createBookingForm() {
    this.bookingFormDialog = this.dialog.open(BookingFormComponent, {
      disableClose: true
    });
    this.bookingFormDialog.afterClosed().subscribe(res => {
      if (res == "login") {
        this.loginEnabled = true;
        this.bookingEnabled = false;
        this.createLoginForm();
      }
    });
  }

  enableForm(name) {
    if (name === "register") {
      this.registerEnabled = true;
      this.bookingEnabled = false;
      this.loginEnabled = false;
      this.loginForm = null;
      this.createRegisterForm();
    } else if (name === "booking") {
      this.bookingEnabled = true;
      this.registerEnabled = false;
      this.loginEnabled = false;
      this.loginForm = null;
      this.registerForm = null;
      this.createBookingForm();
    } else {
      this.loginEnabled = true;
      this.registerEnabled = false;
      this.bookingEnabled = false;
      this.registerForm = null;
      this.createLoginForm();
    }
  }

  async onLogin(formData) {
    this.apiInProgress = true;
    try {
      await this.apiService.onLogin(formData);
      this.apiInProgress = false;
      this.router.navigate(["dashboard"]);
    } catch (err) {
      console.log(err);
      this.errorMessage = err["message"];
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
      this.apiInProgress = false;
    }
  }
}
