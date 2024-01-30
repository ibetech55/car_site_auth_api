import "reflect-metadata";
import { DataSource } from "typeorm";
import '../../Configs/Enviroment'
import { Auth } from "../../Entities/auth.entity";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME, PORT } from "../../Configs/Enviroment/EnvirmentVariables";
import { AuthUsers } from "../../Entities/auth.user.entity";


const AppDataSource = new DataSource({
  type: "postgres",
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  synchronize: false,
  logging: false,
  entities: [AuthUsers, Auth],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`]});
export { AppDataSource };
