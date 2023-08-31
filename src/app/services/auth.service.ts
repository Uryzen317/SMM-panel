import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of } from "rxjs";
import { AuthState, LoginMetaData, SignupMetaData } from "../types/auth.type";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // init value
  authState: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>({
    status: "loading",
  });

  constructor(public http: HttpClient) {
    this.init();
  }

  init() {
    const accessToken = window.localStorage.getItem("accesstoken");

    if (accessToken) {
      // retrieve user data from server
      this.whoAmI(() => {});
    } else {
      // no data from user
      this.authState.next({ status: "failed" });
    }
  }

  login(metaData: LoginMetaData): Observable<any> {
    return this.http.post(environment.apiUrl + "user/login", metaData);
  }

  signup(metaData: SignupMetaData): Observable<any> {
    return this.http.post(environment.apiUrl + "user/signup", metaData);
  }

  whoAmI(cb: any) {
    this.http
      .get(environment.apiUrl + "user/whoami", {
        headers: new HttpHeaders({
          accesstoken: window.localStorage.getItem("accesstoken") || "",
        }),
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);

          this.authState.next({
            status: "success",
            accessToken:
              window.localStorage.getItem("accesstoken") || undefined,
            user: response,
            username: response.username,
          });

          console.log("whoami data recieved");
          cb(true);
        },
        error: (error: any) => {
          this.authState.next({
            status: "failed",
          });

          console.log("whoam i data filed");
          cb(false);
        },
      });
  }

  logout() {}
}
