import { Controller, Post, Body, UseGuards, Get, Req } from "@nestjs/common";
import {
  ChangeEmailDTO,
  ChangePasswordDTO,
  ChangeUsernameDTO,
  LoginDTO,
  SignupDTO,
} from "../dtos/user.dto";
import { UserGuard } from "../guards/user.guard";
import { AuthService } from "../services/auth.service";
import { LoginResponse, SignupResponse } from "../types/user.type";

@Controller("user")
export class UserController {
  constructor(public authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDTO): Promise<LoginResponse> {
    return await this.authService.login(loginDto);
  }

  @Post("signup")
  async signup(@Body() signupDto: SignupDTO): Promise<SignupResponse> {
    return await this.authService.signup(signupDto);
  }

  @UseGuards(UserGuard)
  @Get("whoAmI")
  async whoAmI(@Req() request: any) {
    return await this.authService.whoAmI(request.user);
  }

  @UseGuards(UserGuard)
  @Post("changeUsername")
  async changeUsername(
    @Req() request: any,
    @Body() changeUsernameDto: ChangeUsernameDTO
  ) {
    return await this.authService.changeUsername(
      request.user,
      changeUsernameDto
    );
  }

  @UseGuards(UserGuard)
  @Post("changeEmail")
  async changeEmail(
    @Req() request: any,
    @Body() changeEmailDto: ChangeEmailDTO
  ) {
    return await this.authService.changeEmail(request.user, changeEmailDto);
  }

  @UseGuards(UserGuard)
  @Post("changePassword")
  async changePassword(
    @Req() request: any,
    @Body() changePasswordDto: ChangePasswordDTO
  ) {
    return await this.authService.changePassword(
      request.user,
      changePasswordDto
    );
  }
}
