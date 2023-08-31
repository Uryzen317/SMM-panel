import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
})
export class OrdersComponent implements OnInit {
  constructor(public http: HttpClient) {}

  @Input("user") user: any = {};
  viewType: number = 0;
  services: any[] = [];
  servicesError: string = "";
  platform: string = "all-services";
  filteredServices: any[] = [];
  popupState: number = 0;
  selectedService: any = {};
  platformsList = [
    "instagram",
    "facebook",
    "youtube",
    "clubhouse",
    "twitter",
    "tiktok",
    "snapchat",
    "apple music",
    "podcast itunes / apple",
    "linkedin",
    "telegram",
    "kwai",
    "spotify",
    "soundcloud",
    "pinterest",
    "shazam",
    "vk.com",
    "dailymotion",
    "tumblr",
    "twitch",
    "datpiff",
    "line",
    "vimeo",
    "reverbenation",
    "mixcloud",
    "app install",
    "imdb",
    "tripadvisor",
    "quora.com",
    "quora",
    "audiomack",
    "likee",
    "yandex",
    "reddit",
    "shopee",
    "ok.ru",
    "coub",
    "discord",
    "onlyfans",
    "periscope",
    "rutube",
    "id1964",
    "trovo",
    "id15",
    "mentimeter.com",
    "dribble",
    "google",
    "rumble",
    "social signals",
    "mix",
    "traffic",
  ];

  ngOnInit() {
    // get list of orders
    this.http
      .get(environment.apiUrl + "service/myOrders", {
        headers: new HttpHeaders({
          accesstoken:
            window.localStorage.getItem("accesstoken")?.toString() || "",
        }),
      })
      .subscribe({
        next: (response: any) => {
          this.services = response;
          this.filteredServices = this.services;
          this.servicesError = "";
          console.log(this.services);
        },
        error: (error: any) => {
          this.servicesError = "an error accured. please try again later.";
        },
      });
  }
}
