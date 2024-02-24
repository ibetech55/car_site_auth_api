import { Request, Response } from "express";
import { LoginUseCase } from "../../../Presentation/Auth/LoginUseCase";
import {
  AUTH_API_DOMAIN,
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
      secure: true,
      expires: expirationDate,
      maxAge: 1000 * 60 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
      domain: AUTH_API_DOMAIN,
    });
    response.cookie("login_token", data.login_token, {
      httpOnly: false,
      secure: true,
      expires: expirationDate,
      maxAge: 1000 * 60 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
      domain: AUTH_API_DOMAIN,
    });

    return response.status(200).json(data);
  }
}

export { LoginController };
