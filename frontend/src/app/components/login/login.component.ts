import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";

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
  bookingForm: FormGroup;
  bookingEnabled: boolean;
  apiInProgress: boolean;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
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
    // this.bookingForm = this.formBuilder.group({
    //   email: [null, Validators.compose([Validators.required])],
    //   password: [null, Validators.compose([Validators.required])]
    // });
    this.bookingForm = null;
  }

  enableForm(name) {
    if (name === "register") {
      this.registerEnabled = true;
      this.bookingEnabled = false;
      this.loginEnabled = false;
      this.bookingForm = null;
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
      this.bookingForm = null;
      this.createLoginForm();
    }
  }

  onLogin(formData) {
    this.apiInProgress = true;
    this.apiService.onLogin(formData).subscribe(
      res => {
        this.apiInProgress = false;
        this.router.navigate(["dashboard"]);
      },
      err => {
        console.log(err);
        this.errorMessage = err["message"];
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
        this.apiInProgress = false;
      }
    );
  }
}
