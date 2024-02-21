import { Request, Response } from "express";
import { LoginUseCase } from "../../../Presentation/Auth/LoginUseCase";
import { CAR_SITE_FRONTEND_URL, COOKIE_DOMAIN } from "../../../Configs/Enviroment/EnvirmentVariables";

class LoginController {
  private readonly _loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this._loginUseCase = loginUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._loginUseCase.execute(request.body);
    console.log(COOKIE_DOMAIN)
    response.cookie("auth_token", data.auth_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 1,
      domain: COOKIE_DOMAIN
    });
    response.cookie("login_token", data.login_token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 1,
      domain: COOKIE_DOMAIN
    });

    return response.status(200).json(data);
  }
}

export { LoginController };
