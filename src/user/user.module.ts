import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controllers/user.controller";
import { UserGuard } from "./guards/user.guard";
import { User, UserSchema } from "./models/user.model";
import { AuthService } from "./services/auth.service";
require("dotenv").config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      verifyOptions: {
        maxAge: "7d",
      },
    }),
  ],
  providers: [AuthService, UserGuard],
  controllers: [UserController],
  exports: [UserGuard, MongooseModule, JwtModule],
})
export class UserModule {}
