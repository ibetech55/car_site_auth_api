import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";
import "../../Configs/Enviroment";
import { apiRoutes } from "../../Routes";
import { AppError } from "../../ErrorHandler/AppError";
import cookieParser from "cookie-parser";
import {
  AUTH_API_DOMAIN,
  CAR_SITE_FRONTEND_URL,
  NODE_ENV,
  PORT,
} from "../../Configs/Enviroment/EnvirmentVariables";
import { bots } from "../../Bots";
import { rabbitMq } from "../../Queue";
class HttpServer {
  app: express.Express;

  constructor() {
    this.app = express();
    this.defaultHeaders();
    this.middlewares();
    this.queues();
    this.jobs();
    this.routes();
    this.errorHandler();
    this.swaggerInit();

    console.log("Connected to Http Server");
  }

  async queues() {
    try {
      await rabbitMq.connect();
      await rabbitMq.subscribeToQueues();
    } catch (error) {
      console.log("RABBIT MQ ERROR", error);
    }
  }

  jobs() {
    bots.execute();
  }

  swaggerInit() {
    const swaggerDocument = YAML.load(
      `${path.resolve()}/src/Configs/swagger.yaml`
    );
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  listen() {
    if (NODE_ENV === "development") {
      this.app.listen(PORT, AUTH_API_DOMAIN, () =>
        console.log(`Listening to ${PORT}`)
      );
    } else {
      this.app.listen(PORT, () => console.log(`Listening to ${PORT}`));
    }
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: CAR_SITE_FRONTEND_URL,
        credentials: true,
      })
    );
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/auth_api", apiRoutes);
  }

  errorHandler() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({ message: err.message });
        } else {
          return res
            .status(500)
            .json({ message: `Internal Server Error ${err.message}` });
        }
      }
    );
  }

  defaultHeaders() {
    this.app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");

      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      
      res.setHeader("Access-Control-Allow-Origin", CAR_SITE_FRONTEND_URL);


      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    });
  }
}

export default new HttpServer();
