import { Request, Response } from "express";
import { LoginUseCase } from "../../../Presentation/Auth/LoginUseCase";
import { CAR_SITE_FRONTEND_URL, COOKIE_DOMAIN } from "../../../Configs/Enviroment/EnvirmentVariables";

class LoginController {
  private readonly _loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this._loginUseCase = loginUseCase;
    console.log(COOKIE_DOMAIN, 999)

  }

  async handle(request: Request, response: Response) {
    const data = await this._loginUseCase.execute(request.body);
    response.cookie("auth_token", data.auth_token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: - 1,
      domain: COOKIE_DOMAIN,
      path: '/',
      expires: new Date(Date.now() + 900000)
    });
    response.cookie("login_token", data.login_token, {
      httpOnly: false,
      secure: false,
      sameSite: "none",
      maxAge: - 1,
      domain: COOKIE_DOMAIN,
      path: '/',
      expires: new Date(Date.now() + 900000)
    });

    return response.status(200).json(data);
  }
}

export { LoginController };
