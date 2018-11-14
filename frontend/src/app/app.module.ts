import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpModule } from "@angular/http";

import { 
  MatButtonModule, 
  MatInputModule,
  MatDialogModule,
  MatStepperModule,
  MatSelectModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { BookingFormComponent } from './components/login/booking-form/booking-form.component'

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, BookingFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  entryComponents: [
    BookingFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
