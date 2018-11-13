import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.localStorageService.clearItem("userRole");
    this.localStorageService.clearItem("token");
    this.router.navigate(["login"]);
  }
}
