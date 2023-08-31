import { Controller, Get } from "@nestjs/common";
import { Feed } from "../models/feed.model";
import { FeedService } from "../services/feed.service";

@Controller("feed")
export class FeedController {
  constructor(public feedService: FeedService) {}

  @Get("get")
  async get(): Promise<Feed[]> {
    return await this.feedService.get();
  }
}
