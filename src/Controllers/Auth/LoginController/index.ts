import { Request, Response } from "express";
import { LoginUseCase } from "../../../Presentation/Auth/LoginUseCase";
import {
 COOKIE_DOMAIN,
 NODE_ENV,
} from "../../../Configs/Enviroment/EnvirmentVariables";

class LoginController {
  private readonly _loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this._loginUseCase = loginUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._loginUseCase.execute(request.body);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    response.cookie("auth_token", data.auth_token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      expires: expirationDate,
      sameSite: "strict",
      path: "/",
      domain: COOKIE_DOMAIN,
    });
    response.cookie("login_token", data.login_token, {
      httpOnly: false,
      secure: NODE_ENV === 'production',
      expires: expirationDate,
      sameSite: "strict",
      path: "/",
      domain: COOKIE_DOMAIN,
    });
    return response.status(200).json(data);
  }
}

export { LoginController };
