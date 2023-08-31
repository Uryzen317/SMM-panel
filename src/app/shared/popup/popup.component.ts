import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
})
export class PopupComponent {
  constructor(public http: HttpClient, public authService: AuthService) {}

  @Input("theme") theme: string = "1";

  // username change popup
  @Output("handleUsernameResult") handleUsernameResult: EventEmitter<
    string | boolean
  > = new EventEmitter<string | boolean>();
  username: string = "";
  usernameStatus: string = "";

  usernameHandler(): void {
    this.handleUsernameResult.emit(this.username);

    // handle usename change login here
    let accesstoken: any;
    this.authService.authState.subscribe((user) => {
      accesstoken = user.accessToken;
    });

    this.http
      .post(
        environment.apiUrl + "user/changeUsername",
        {
          newUsername: this.username,
        },
        {
          headers: new HttpHeaders({
            accesstoken,
          }),
        }
      )
      .subscribe({
        next: (response: any) => {
          this.authService.whoAmI(() => {
            // refresh the cache
            this.usernameClose(); // close it up
          });
        },
        error: (error: any) => {
          this.emailStatus = error.error?.message
            ? error.error.message[0]
            : error.error.error ||
              "something went wrong . please try again later.";
        },
      });
  }
  usernameClose(): void {
    this.handleUsernameResult.emit(false);
  }
  usernameChange(data: string | boolean): void {
    this.username = data.toString();
  }

  // email change popup
  @Output("handleEmailResult") handleEmailResult: EventEmitter<
    string | boolean
  > = new EventEmitter<string | boolean>();
  email: string = "";
  emailStatus: string = "";

  emailHandler(): void {
    this.handleEmailResult.emit(this.email);

    // handle email change login here
    let accesstoken: any;
    this.authService.authState.subscribe((user) => {
      accesstoken = user.accessToken;
    });

    this.http
      .post(
        environment.apiUrl + "user/changeEmail",
        {
          newEmail: this.email,
        },
        {
          headers: new HttpHeaders({
            accesstoken,
          }),
        }
      )
      .subscribe({
        next: (response: any) => {
          this.authService.whoAmI(() => {
            // refresh the cache
            this.emailClose(); // close it up
          });
        },
        error: (error: any) => {
          this.emailStatus = error.error?.message
            ? error.error.message[0]
            : error.error.error ||
              "something went wrong . please try again later.";
        },
      });
  }
  emailClose(): void {
    this.handleEmailResult.emit(false);
  }
  emailChange(data: string | boolean): void {
    this.email = data.toString();
  }

  // password change popup
  @Output("handlePasswordResult") handlePasswordResult: EventEmitter<
    string | boolean
  > = new EventEmitter<string | boolean>();
  oldPassword: string = "";
  password: string = "";
  passwordRepaet: string = "";
  passwordStatus: string = "";

  passwordHandler(): void {
    this.handlePasswordResult.emit(this.password);

    // handle password change login here
    let accesstoken: any;
    this.authService.authState.subscribe((user) => {
      accesstoken = user.accessToken;
    });

    console.log(this.password, this.passwordRepaet);

    // check if password id repeated currectly
    if (this.password !== this.passwordRepaet) {
      this.passwordStatus =
        "please make sure you have repeated your password currectly.";
      return;
    }

    this.http
      .post(
        environment.apiUrl + "user/changePassword",
        {
          oldPassword: this.oldPassword,
          newPassword: this.password,
        },
        {
          headers: new HttpHeaders({
            accesstoken,
          }),
        }
      )
      .subscribe({
        next: (response: any) => {
          this.authService.whoAmI(() => {
            // refresh the cache
            this.passwordClose(); // close it up
          });
        },
        error: (error: any) => {
          this.passwordStatus = error.error?.message
            ? error.error.message[0]
            : error.error.error ||
              "something went wrong . please try again later.";
        },
      });
  }
  passwordClose(): void {
    this.handlePasswordResult.emit(false);
  }
  passwordChange(data: string | boolean): void {
    this.password = data.toString();
  }
  repeatPasswordChange(data: string | boolean): void {
    this.passwordRepaet = data.toString();
  }
  oldPasswordChange(data: string | boolean): void {
    this.oldPassword = data.toString();
  }

  // confirm email popup
  @Output("handleConfirmEmailResult") handleConfirmEmailResult: EventEmitter<
    string | boolean
  > = new EventEmitter<string | boolean>();

  confirmEmailClose(): void {
    this.handleConfirmEmailResult.emit(false);
  }

  // logout popup
  @Output("handleLogoutResult") handleLogoutResult: EventEmitter<
    string | boolean
  > = new EventEmitter<string | boolean>();

  logoutHandler(): void {
    this.handleLogoutResult.emit(true);
    this.handleLogoutResult.emit(false); // close it up immidiately
  }

  logoutClose(): void {
    this.handleLogoutResult.emit(false);
  }

  // deleteAccount popup
  @Output("handleDeleteAccountResult") handleDeleteAccountResult: EventEmitter<
    string | boolean
  > = new EventEmitter<string | boolean>();

  deleteAccountClose(): void {
    this.handleDeleteAccountResult.emit(false);
  }

  // submit order popup
  @Output("handleSubmitOrderResult") handleSubmitOrderResult: EventEmitter<
    string | boolean
  > = new EventEmitter<string | boolean>();
  @Input("service") service: any = {};
  link: string = "";
  quantity: number = this.service.min || 0;
  orderStatus: string = "";
  orderState: string = "";

  handleOrder() {
    this.orderState = "load";

    // validation
    this.orderStatus = "";
    if (!this.link) {
      this.orderStatus = "please fill out the link field.";
      this.orderState = "";
      return;
    }
    if (this.quantity == 0) {
      this.quantity = parseInt(this.service.min);
    }
    if (!this.quantity) {
      this.orderStatus = "please fill out the quantity field.";
      this.orderState = "";
      return;
    }

    let accesstoken: string = "";
    this.authService.authState.subscribe(
      (data) => (accesstoken = data.accessToken || "")
    );

    this.http
      .post(
        environment.apiUrl + "service/order",
        {
          link: this.link,
          quantity: this.quantity,
          id: parseInt(this.service.service),
        },
        {
          headers: new HttpHeaders({
            accesstoken,
          }),
        }
      )
      .subscribe({
        next: (response: any) => {
          this.orderState = "";
          this.authService.whoAmI(() => {
            this.closeSumbitOrderPopup(); // close it up
          });
        },
        error: (error: any) => {
          this.orderState = "";
          this.orderStatus = error?.error?.message
            ? error.error.message[0]
            : error?.error?.error ||
              "something went wrong, please try again later.";
        },
      });
  }
  linkChange(event: any) {
    this.link = event;
  }
  quantityChange(event: any) {
    this.quantity = parseInt(event);
  }
  closeSumbitOrderPopup() {
    this.handleSubmitOrderResult.emit(false);
  }
}
