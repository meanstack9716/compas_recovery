import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RouteGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(state.url)
    if (state.url != "/login") {
      if (this.localStorageService.getItem("token")) {
        return true;
      } else {
        this.router.navigate(["login"]);
      }
    } else {
      if (this.localStorageService.getItem("token")) {
        this.router.navigate(["dashboard"]);
      } else {
        return true;
      }
    }
  }
}
