import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FeedController } from "./controllers/feed.controller";
import { Feed, FeedSchema } from "./models/feed.model";
import { FeedService } from "./services/feed.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
