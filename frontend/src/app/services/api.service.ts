import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(
    public http: Http,
    private localStorageService: LocalStorageService
  ) {}

  async onLogin(body) {
    try {
      let res = await this.http
        .post(`${environment["apiBase"]}user/login`, body)
        .toPromise();
      let response = res.json();
      this.localStorageService.setItem("token", response["token"]);
      this.localStorageService.setItem("userRole", response["role"]);
      this.localStorageService.setItem('name', response["firstname"] + ' ' + response["lastname"])
      return res.json();
    } catch (error) {
      throw (error.json());
    }
  }
}
