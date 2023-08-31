import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Orders } from "../types/user.type";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, minlength: 5, maxlength: 64, unique: true })
  username: string;

  @Prop({ required: true, minlength: 5, maxlength: 256 })
  password: string;

  @Prop({ required: true, minlength: 5, maxlength: 256 })
  email: string;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop({ default: 0, min: 0 })
  money: number;

  @Prop({ default: [], type: Array<Orders> })
  orders: Orders;

  @Prop({ default: "user" })
  role: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  apiKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
