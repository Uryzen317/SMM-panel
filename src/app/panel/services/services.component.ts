import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
})
export class ServicesComponent implements OnInit {
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
    this.http.get(environment.apiUrl + "service/services").subscribe({
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

  serviceChange(value: any) {
    this.platform = value;
    console.log(this.platform);

    this.filteredServices =
      value === "all-platforms"
        ? this.services
        : this.services.filter((service) =>
            service.name.toLowerCase().includes(`${this.platform} `)
          );
  }

  order(filteredService: any) {
    this.selectedService = filteredService;
    this.popupState = 7;
    console.log("order in progress");
  }

  handleSubmitOrderResult(event: any) {
    console.log(event);
    if (!event) this.popupState = 0;
  }
}
