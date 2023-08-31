import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  state: string = "login";
  loginStatus: string = "";
  signupStatus: string = "";
  forgotPasswordStatus: string = "";
  userData: any = {};

  constructor(
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe({
      next: (value): void => {
        this.state = value["opt"] || "login";
        this.userData = {};
      },
    });
  }

  // handler input changes
  changeHandler(data: string | boolean, target: string): void {
    this.userData[target] = data;
  }

  validate(opt: string = "login"): boolean {
    let validationResult: boolean = true;

    switch (opt) {
      case "login": {
        // login validation handle
        this.loginStatus = "";

        if (!this.userData.username) {
          this.loginStatus = "please enter your username / email.";
          validationResult = false;
        } else if (this.userData.username?.length < 5) {
          this.loginStatus = "username / email must be longer than 5 letters.";
          validationResult = false;
        } else if (this.userData.username?.length > 256) {
          this.loginStatus =
            "username / email must be shorter than 256 letters.";
          validationResult = false;
        }

        if (!this.userData.password && validationResult) {
          this.loginStatus = "please enter your password.";
          validationResult = false;
        } else if (this.userData.password?.length < 5) {
          this.loginStatus = "password must be longer than 5 letters.";
          validationResult = false;
        }
        if (this.userData.password?.length > 64) {
          this.loginStatus = "password must be shorter than 64 letters.";
          validationResult = false;
        }

        if (!this.userData.rememberme) this.userData.rememberme = false;

        break;
      }
      case "signup": {
        // signup validation handle
        this.signupStatus = "";

        if (!this.userData.username) {
          this.signupStatus = "please enter your username.";
          validationResult = false;
        } else if (this.userData.username?.length < 5) {
          this.signupStatus = "username must be longer than 5 letters.";
          validationResult = false;
        } else if (this.userData.username?.length > 64) {
          this.signupStatus = "username must be shorter than 64 letters.";
          validationResult = false;
        }

        if (!this.userData.email && validationResult) {
          this.signupStatus = "please enter your email.";
          validationResult = false;
        } else if (this.userData.email?.length < 5) {
          this.signupStatus = "email must be longer than 5 letters.";
          validationResult = false;
        } else if (this.userData.email?.length > 256) {
          this.signupStatus = "email must be shorter than 256 letters.";
          validationResult = false;
        }

        if (!this.userData.password && validationResult) {
          this.signupStatus = "please enter your password.";
          validationResult = false;
        } else if (this.userData.password?.length < 5) {
          this.signupStatus = "password must be longer than 5 letters.";
          validationResult = false;
        } else if (this.userData.password?.length > 64) {
          this.signupStatus = "password must be shorter than 64 letters.";
          validationResult = false;
        }

        if (
          this.userData.password !== this.userData.repeatPassword &&
          validationResult
        ) {
          this.signupStatus =
            "your repeated password does not math your password.";
          validationResult = false;
        }

        if (!this.userData.rememberme) this.userData.rememberme = false;

        break;
      }
    }

    return validationResult;
  }

  login(): void {
    const validationResult = this.validate("login");
    if (!validationResult) return;

    this.authService.login(this.userData).subscribe({
      next: (response: any) => {
        localStorage.setItem("accesstoken", response.accessToken);
        this.authService.whoAmI((result: boolean) => {
          if (result) {
            this.router.navigate(["panel"]);
          } else {
            this.loginStatus = "something went wrong. pleaes try again later.";
          }
        });

        console.log("login success response: ", response);
      },
      error: (error: any) => {
        this.loginStatus = error?.error?.message
          ? error.error.message[0]
          : error.error.error ||
            "something went wrong. please try again later.";
        console.log("login failed respnse: ", error);
      },
    });
  }

  signup(): void {
    const validationResult = this.validate("signup");
    if (!validationResult) return;

    this.authService.signup(this.userData).subscribe({
      next: (response: any) => {
        localStorage.setItem("accesstoken", response.accessToken);
        this.authService.whoAmI((result: boolean) => {
          if (result) {
            this.router.navigate(["panel"]);
          } else {
            this.signupStatus = "something went wrong. pleaes try again later.";
          }
        });

        console.log("signup success response: ", response);
      },
      error: (error: any) => {
        this.signupStatus = error?.error?.message
          ? error.error.message[0]
          : error.error.error ||
            "something went wrong. please try again later.";
        console.log("signup failed respnse: ", error);
      },
    });
  }
}
