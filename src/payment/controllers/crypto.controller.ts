import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UserGuard } from "src/user/guards/user.guard";
import { CryptoService } from "../services/crypto.service";

@Controller("payment/crypto")
export class CryptoController {
  constructor(
    public cryptoService: CryptoService,
    public userGuard: UserGuard
  ) {}

  @UseGuards(UserGuard)
  @Post("create")
  async create(@Req() request) {
    return await this.cryptoService.create(request.user);
  }
}
