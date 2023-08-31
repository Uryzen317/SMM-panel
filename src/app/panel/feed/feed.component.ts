import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"],
})
export class FeedComponent implements OnInit {
  constructor(public client: HttpClient) {}

  ngOnInit(): void {
    this.client.get(environment.apiUrl + "feed/get").subscribe({
      next: (response: any) => {
        // this.feeds = response;
        // for production
      },
      error: (error: any) => {
        this.feeds = [];
      },
    });
  }

  feeds: any[] = [
    {
      header: "Feed header",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt error laborum officia voluptatem quas quo id illo eaque, exercitationem, nobis velit consequatur voluptate reprehenderit? Incidunt pariatur ducimus illo est.",
      status: true,
      date: new Date(),
      author: "admin",
    },
    {
      header: "Feed header",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt error laborum officia voluptatem quas quo id illo eaque, exercitationem, nobis velit consequatur voluptate reprehenderit? Incidunt pariatur ducimus illo est.",
      status: true,
      date: new Date(),
      author: "admin",
    },
    {
      header: "Feed header",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt error laborum officia voluptatem quas quo id illo eaque, exercitationem, nobis velit consequatur voluptate reprehenderit? Incidunt pariatur ducimus illo est.",
      status: true,
      date: new Date(),
      author: "admin",
    },
    {
      header: "Feed header",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt error laborum officia voluptatem quas quo id illo eaque, exercitationem, nobis velit consequatur voluptate reprehenderit? Incidunt pariatur ducimus illo est.",
      status: true,
      date: new Date(),
      author: "admin",
    },
    {
      header: "Feed header",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt error laborum officia voluptatem quas quo id illo eaque, exercitationem, nobis velit consequatur voluptate reprehenderit? Incidunt pariatur ducimus illo est.",
      status: true,
      date: new Date(),
      author: "admin",
    },
  ];
}
