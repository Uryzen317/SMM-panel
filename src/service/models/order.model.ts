import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Document } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  ownerId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  cost: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
