import { Request, Response } from "express";
import { LogoutUseCase } from "../../../Presentation/Auth/LogoutUseCase";

class LogoutController {
  private _logoutUseCase: LogoutUseCase;

  constructor(logoutUseCase: LogoutUseCase) {
    this._logoutUseCase = logoutUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._logoutUseCase.execute(request.cookies['auth_token']);
    response.clearCookie("auth_token", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite:'strict',
      path: "/",
      domain: 'ibetech.shop'
    });

    response.cookie("login_token", data.login_token, {
      httpOnly: false,
      secure: true,
      expires: new Date(0),
      sameSite:'strict',
      path: "/",
      domain: 'ibetech.shop'
    });


    return response.clearCookie('auth_token').clearCookie('login_token').status(200).json(true);
  }
}

export { LogoutController };
