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

  onLogin(body) {
    return this.http
      .post(`${environment["apiBase"]}user/login`, body)
      .map((res: Response) => {
        let response = res.json();
        this.localStorageService.setItem("token", response["token"]);
        this.localStorageService.setItem("userRole", response["role"]);
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || "Server error");
      });
  }
}
