export type AuthState = {
  status: string;
  accessToken?: string;
  username?: string;
  user?: any;
};

export type LoginMetaData = {
  username: string;
  password: string;
  rememberme: boolean;
};

export type SignupMetaData = {
  username: string;
  password: string;
  email: string;
  rememberme: boolean;
  repeatPassword: string;
};
