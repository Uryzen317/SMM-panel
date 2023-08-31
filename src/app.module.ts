import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ServiceModule } from "./service/service.module";
import { PaymentModule } from './payment/payment.module';
import { FeedModule } from './feed/feed.module';

require("dotenv").config();

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}:${process.env.DB_PORT}/${process.env.DB_NAME}`
      `mongodb://127.0.0.1:27017/test`
    ),

    UserModule,

    ServiceModule,

    PaymentModule,

    FeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
