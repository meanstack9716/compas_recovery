import { Route } from "@angular/router";
import { LoginComponent } from "src/app/components/login/login.component";
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { RouteGuard } from "./services/route.guard";

export const routes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [RouteGuard]
  },

  {
    path: "login",
    component: LoginComponent,
    canActivate: [RouteGuard]    
  }
];
