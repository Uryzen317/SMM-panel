import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Adminstration extends Document {
  @Prop({ min: 0, default: 10 })
  additionalFee: number;
}

export const AdminstrationSchema = SchemaFactory.createForClass(Adminstration);
