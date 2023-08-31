import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Feed } from "../models/feed.model";

@Injectable()
export class FeedService {
  constructor(@InjectModel(Feed.name) public feed: Model<Feed>) {}

  async get(): Promise<Feed[]> {
    return await this.feed.find().limit(100);
  }

  async set() {}
}
