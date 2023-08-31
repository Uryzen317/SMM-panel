import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsBoolean,
  IsEmail,
} from "class-validator";

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(256)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(64)
  password: string;

  @IsBoolean()
  rememberme: boolean;
}

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(64)
  username: string;

  @IsEmail({}, { message: "please enter a valid email." })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(256)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(64)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(64)
  repeatPassword: string;

  @IsBoolean()
  rememberme: boolean;
}

export class WhoAmIDTO {
  @IsString()
  @IsNotEmpty()
  accesstoken: string;
}

export class ChangeUsernameDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(64)
  newUsername: string;
}

export class ChangeEmailDTO {
  @IsEmail({}, { message: "please enter a valid email." })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(245)
  newEmail: string;
}

export class ChangePasswordDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(64)
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @MinLength(5)
  @MaxLength(64)
  @IsNotEmpty()
  newPassword: string;
}
