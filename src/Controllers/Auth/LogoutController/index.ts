import { Request, Response } from "express";
import { LogoutUseCase } from "../../../Presentation/Auth/LogoutUseCase";
import { COOKIE_DOMAIN, KUBERENETES_AUTH, NODE_ENV } from "../../../Configs/Enviroment/EnvirmentVariables";

class LogoutController {
  private _logoutUseCase: LogoutUseCase;

  constructor(logoutUseCase: LogoutUseCase) {
    this._logoutUseCase = logoutUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._logoutUseCase.execute(request.cookies['auth_token']);
    response.clearCookie("auth_token", {
      httpOnly: true,
      secure: NODE_ENV === 'production' && KUBERENETES_AUTH,
      expires: new Date(0),
      sameSite:'strict',
      path: "/",
      domain: COOKIE_DOMAIN,
    });

    response.cookie("login_token", data.login_token, {
      httpOnly: false,
      secure: NODE_ENV === 'production' && KUBERENETES_AUTH,
      expires: new Date(0),
      sameSite:'strict',
      path: "/",
      domain: COOKIE_DOMAIN,
    });


    return response.status(200).json(true);
  }
}

export { LogoutController };
