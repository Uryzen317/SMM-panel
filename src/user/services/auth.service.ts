import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ChangeEmailDTO,
  ChangePasswordDTO,
  ChangeUsernameDTO,
  LoginDTO,
  SignupDTO,
} from "../dtos/user.dto";
import { User } from "../models/user.model";
import {
  LoginResponse,
  RequestUser,
  SignupResponse,
} from "../types/user.type";
import { JwtService } from "@nestjs/jwt/dist";
import * as argon from "argon2";
import { ObjectId } from "mongodb";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) public user: Model<User>,
    public jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO): Promise<LoginResponse> {
    // check if a use exists matching given data
    let user: any = await this.user.findOne({
      $or: [{ username: loginDto.username }, { email: loginDto.username }],
    });

    if (!user) {
      throw new BadRequestException({
        status: "failed",
        error: "make sure your username/email and password are correct.",
      });
    }

    // compare rehashed passoword
    let isMatch: boolean = false;
    try {
      isMatch = await argon.verify(user.password, loginDto.password);
      isMatch = isMatch ? true : false;
    } catch {
      isMatch = false;
    }

    if (!isMatch) {
      throw new BadRequestException({
        status: "failed",
        error: "make sure your username/email and password are correct.",
      });
    }

    // generate access token
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
      },
      {
        expiresIn: loginDto.rememberme ? "7d" : "1d",
      }
    );

    return {
      status: "success",
      accessToken,
    };
  }

  async signup(signupDto: SignupDTO): Promise<SignupResponse> {
    // check if a user with similar email or username exists
    let user: any = await this.user.findOne({
      $or: [
        { username: signupDto.username },
        { username: signupDto.email },
        { email: signupDto.email },
        { email: signupDto.username },
      ],
    });

    if (user) {
      throw new BadRequestException({
        status: "failed",
        error: "you can't use this username / email.",
      });
    }

    // generating new password hash
    let hash: string = "";
    try {
      hash = await argon.hash(signupDto.password);
    } catch {
      hash = null;
      console.log("hashing error.");
    }

    if (!hash) {
      throw new BadRequestException({
        status: "failed",
        error: "something went wrong. please try again later.",
      });
    }

    user = await this.user.insertMany([
      {
        username: signupDto.username,
        email: signupDto.email,
        password: hash,
        apiKey: new ObjectId(),
      },
    ]);

    // generate access token
    const accessToken = await this.jwtService.signAsync(
      {
        id: user[0].id,
        username: user[0].username,
      },
      {
        expiresIn: signupDto.rememberme ? "7d" : "1d",
      }
    );

    return {
      status: "success",
      accessToken,
    };
  }

  async whoAmI(user: RequestUser): Promise<any> {
    // find the user
    let foundUser = await this.user.findOne(
      { _id: user.id },
      {
        password: false,
      }
    );

    return foundUser;
  }

  async changeUsername(
    user: RequestUser,
    changeUsernameDto: ChangeUsernameDTO
  ): Promise<any> {
    // check if username has confilct isssue
    let foundUser: any = await this.user.findOne({
      $or: [
        { username: changeUsernameDto.newUsername },
        { email: changeUsernameDto.newUsername },
      ],
    });

    if (foundUser) {
      throw new BadRequestException({
        status: "error",
        error: "you can't use this username.",
      });
    }

    // register the new username
    await this.user.updateOne(
      {
        _id: user.id,
      },
      {
        $set: { username: changeUsernameDto.newUsername },
      }
    );

    return await { status: "success" };
  }

  async changeEmail(
    user: RequestUser,
    changeEmailDto: ChangeEmailDTO
  ): Promise<any> {
    // check if username has confilct isssue
    let foundUser: any = await this.user.findOne({
      $or: [
        { username: changeEmailDto.newEmail },
        { email: changeEmailDto.newEmail },
      ],
    });

    if (foundUser) {
      throw new BadRequestException({
        status: "error",
        error: "you can't use this email.",
      });
    }

    // register the new username
    await this.user.updateOne(
      {
        _id: user.id,
      },
      {
        $set: { email: changeEmailDto.newEmail, isEmailConfirmed: false },
      }
    );

    return await { status: "success" };
  }

  async changePassword(
    user: RequestUser,
    changePasswordDto: ChangePasswordDTO
  ): Promise<any> {
    // fetch user
    let foundUser: any = await this.user.findOne(
      {
        _id: user.id,
      },
      { password: true }
    );

    console.log(foundUser);

    // check the hashed password
    let isMatch: boolean = false;
    try {
      isMatch = await argon.verify(
        foundUser.password,
        changePasswordDto.oldPassword
      );
      isMatch = isMatch ? true : false;
    } catch {
      isMatch = false;
    }

    if (!isMatch) {
      throw new BadRequestException({
        status: "failed",
        error: "current password is entered wrong.",
      });
    }

    // hash new password
    let password: string | null = null;
    try {
      password = await argon.hash(changePasswordDto.newPassword);
    } catch {
      password = null;
    }

    if (!password) {
      throw new BadRequestException({
        status: "failed",
        error: "something went wrong. please try again later",
      });
    }

    await this.user.findOneAndUpdate({ _id: user.id }, { $set: { password } });

    return { status: "success" };
  }
}
