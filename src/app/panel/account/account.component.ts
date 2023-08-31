import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
})
export class AccountComponent {
  constructor(public authService: AuthService, public router: Router) {}

  @Input("user") user: any;

  popupState: number = 0;

  // change username popup
  handleUsernameResult(event: string | boolean) {
    if (!event) this.popupState = 0;
  }

  // change email popup
  handleEmailResult(event: string | boolean) {
    if (!event) this.popupState = 0;
  }

  // change passwod popup
  handlePasswordResult(event: string | boolean) {
    if (!event) this.popupState = 0;
  }

  // confirm email popup
  handleConfirmEmailResult(event: string | boolean) {
    if (!event) this.popupState = 0;
  }

  // copy api key
  handleCopyApiKey() {
    navigator.clipboard.writeText(this.user.user.apiKey);
  }

  // logout
  handleLogoutResult(event: string | boolean) {
    if (!event) this.popupState = 0;
    if (event) {
      window.localStorage.removeItem("accesstoken");
      this.authService.authState.next({ status: "failed" });
      this.router.navigate(["auth/login"]);
    }
  }

  // confirm email popup
  handleDeleteAccountResult(event: string | boolean) {
    if (!event) this.popupState = 0;
  }
}
