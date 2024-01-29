import { AppDataSource } from "./connection";
  AppDataSource.initialize()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => console.log(error));

