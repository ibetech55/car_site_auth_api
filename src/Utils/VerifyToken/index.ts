import { AUTH_TOKEN_SECRET_KEY } from "../../Configs/Enviroment/EnvirmentVariables";
import { AppError } from "../../ErrorHandler/AppError";
import jwt from "jsonwebtoken";

export interface ITokenData {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  type: string;
  iat: number;
  exp: number;
}

export interface ILoginTokenData {
  user_id: string;
  iat: number;
  exp: number;
}

export const verifyToken = (
  token: string,
  login_token: string
): { token: ITokenData; login_token: ILoginTokenData } => {
  if (!token || !login_token) {
    throw new AppError("Forbidden", 403);
  }

  const checkToken = jwt.verify(token, AUTH_TOKEN_SECRET_KEY) as ITokenData;
  const checkLoginToken = jwt.verify(
    login_token,
    AUTH_TOKEN_SECRET_KEY
  ) as ILoginTokenData;

  if (checkToken.user_id !== checkLoginToken.user_id) {
    throw new AppError("Forbidden", 403);
  }

  if (!checkToken || !checkLoginToken) {
    throw new AppError("Forbidden", 403);
  }

  return { token: checkToken, login_token: checkLoginToken };
};
