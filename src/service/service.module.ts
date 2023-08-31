import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { ServiceController } from "./controllers/service.controller";
import {
  Adminstration,
  AdminstrationSchema,
} from "./models/adminstration.model";
import { Order, OrderSchema } from "./models/order.model";
import { ServiceService } from "./services/service.service";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Adminstration.name, schema: AdminstrationSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [MongooseModule],
})
export class ServiceModule {}
