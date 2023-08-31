import { Module } from "@nestjs/common";
import { UserGuard } from "src/user/guards/user.guard";
import { UserModule } from "src/user/user.module";
import { CryptoController } from "./controllers/crypto.controller";
import { CryptoService } from "./services/crypto.service";

@Module({
  controllers: [CryptoController],
  providers: [CryptoService],
  imports: [UserModule],
})
export class PaymentModule {}
