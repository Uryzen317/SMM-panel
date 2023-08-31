import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-charge",
  templateUrl: "./charge.component.html",
  styleUrls: ["./charge.component.css"],
})
export class ChargeComponent {
  constructor(public http: HttpClient, public authService: AuthService) {}
  paymentStatus: string = "";
  amount: number = 0;

  amountHandler(amount: string | boolean) {
    this.amount = parseFloat(amount.toString());
  }

  createCryptoPayment() {
    // basic validation
    this.paymentStatus = "";
    if (this.amount < 5) {
      this.paymentStatus = "you cant charge for less than 5$.";
      return;
    }
    if (this.amount > 1000) {
      this.paymentStatus = "you cant charge for more than 1000$.";
    }

    // get the accesstoken
    let accesstoken: string = "";
    this.authService.authState.subscribe({
      next: (value) => {
        accesstoken = value.accessToken || "";
      },
    });

    // pay
    this.http
      .post(
        environment.apiUrl + "payment/crypto/create",
        {
          amount: this.amount,
        },
        {
          headers: new HttpHeaders({ accesstoken }),
        }
      )
      .subscribe({
        next: (resonse: any) => {
          this.authService.whoAmI(() => {
            window.location.reload();
          });
        },
        error: (error: any) => {
          this.paymentStatus = error?.error?.message
            ? error.error.message[0]
            : error.error.error ||
              "something went wrong. please try again later.";
          console.log("crypt payment failed respnse: ", error);
        },
      });
  }
}
