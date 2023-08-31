import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/user/models/user.model";

@Schema({ timestamps: true })
export class Feed extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  author: User;

  @Prop({ required: true })
  desc: string;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
