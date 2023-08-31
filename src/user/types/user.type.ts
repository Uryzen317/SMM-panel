import { HttpException } from "@nestjs/common";

export type Orders = { orderNumber: number }[];

export type LoginResponse =
  | HttpException
  | {
      status: string;
      accessToken?: string;
      error?: string;
    };

export type SignupResponse =
  | HttpException
  | {
      status: string;
      accessToken?: string;
      error?: string;
    };

export type WhoAmIResponse =
  | HttpException
  | {
      username: string;
      email: string;
      money: number;
      isEmailConfirmed: boolean;
      role: string;
    };

export type RequestUser = { username: string; id: string };
