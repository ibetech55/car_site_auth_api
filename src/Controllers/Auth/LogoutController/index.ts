import { Request, Response } from "express";
import { LogoutUseCase } from "../../../Presentation/Auth/LogoutUseCase";

class LogoutController {
  private _logoutUseCase: LogoutUseCase;

  constructor(logoutUseCase: LogoutUseCase) {
    this._logoutUseCase = logoutUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._logoutUseCase.execute(request.cookies['auth_token']);
    response.clearCookie('auth_token');
    response.clearCookie('login_token')

    return response.status(200).json(true);
  }
}

export { LogoutController };
