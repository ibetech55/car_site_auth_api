import { Request, Response } from "express";
import { LoginUseCase } from "../../../Presentation/Auth/LoginUseCase";
import {
  CAR_SITE_FRONTEND_URL,
  COOKIE_DOMAIN,
} from "../../../Configs/Enviroment/EnvirmentVariables";

class LoginController {
  private readonly _loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this._loginUseCase = loginUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._loginUseCase.execute(request.body);
    response.cookie("auth_token", data.auth_token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 900000),
      path: "/",
    });
    response.cookie("login_token", data.login_token, {
      httpOnly: false,
      secure: true,
      expires: new Date(Date.now() + 900000),
      path: "/",
    });
    // const expirationDate = new Date();
    // expirationDate.setDate(expirationDate.getDate() + 7);
    // const expires = expirationDate.toUTCString();

    // // response.set('Set-Cookie', `auth_token=${data.auth_token}; HttpOnly`)
    // // response.set('Set-Cookie', `auth_token=${data.auth_token}; HttpOnly; Expires=${expires}; Max-Age=604800`);

    return response.status(200).json(data);
  }
}

export { LoginController };
