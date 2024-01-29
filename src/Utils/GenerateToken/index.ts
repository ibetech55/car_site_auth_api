import jwtToken from "jsonwebtoken";
import {
  AUTH_TOKEN_SECRET_KEY,
  AUTH_TOKEN_TIME,
} from "../../Configs/Enviroment/EnvirmentVariables";

interface ITokenData {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  type: string;
}

interface ILoginTokenData {
  user_id: string;
}

class GenerateToken {
  async authToken(userData: ITokenData): Promise<string> {
    const token = jwtToken.sign(userData, AUTH_TOKEN_SECRET_KEY, {
      expiresIn: AUTH_TOKEN_TIME,
    });

    return token;
  }

  async loginToken(userData: ILoginTokenData): Promise<string> {
    const token = jwtToken.sign(userData, AUTH_TOKEN_SECRET_KEY, {
      expiresIn: AUTH_TOKEN_TIME,
    });

    return token;
  }
}

export { GenerateToken };
