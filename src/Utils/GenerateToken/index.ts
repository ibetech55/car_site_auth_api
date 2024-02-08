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
  authToken(userData: ITokenData): string {
    const token = jwtToken.sign(userData, AUTH_TOKEN_SECRET_KEY, {
      expiresIn: AUTH_TOKEN_TIME,
    });

    return token;
  }

  loginToken(userData: ILoginTokenData): string {
    const token = jwtToken.sign(userData, AUTH_TOKEN_SECRET_KEY, {
      expiresIn: AUTH_TOKEN_TIME,
    });

    return token;
  }
}

export { GenerateToken };
