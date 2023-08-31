import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
})
export class PanelComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public authService: AuthService
  ) {}

  user: any;
  state: string = "account";
  validSubRouted: string[] = [
    "account",
    "services",
    "orders",
    "charge",
    "support",
    "feed",
    "faq",
  ];

  ngOnInit() {
    // get routing params
    this.activatedRoute.params.subscribe({
      next: (param: any) => {
        if (param.opt) {
          // path is defined. obscure state
          if (this.validSubRouted.find((vsr) => vsr === param.opt)) {
            // path is valid
            this.state = param.opt;
          } else {
            // path is unvalid
            this.router.navigate(["/panel"]);
          }
        } else {
          // path is undefined. still valid.
          this.state = this.validSubRouted[0];
        }
      },
    });

    // get user
    this.authService.authState.subscribe({
      next: (user: any) => {
        this.user = user;
      },
    });
  }
}
