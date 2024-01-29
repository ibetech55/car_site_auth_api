import { Router } from "express";
import { loginController } from "../Containers/Auth/Login";
import { logoutController } from "../Containers/Auth/Logout";

const authRoutes = Router();
authRoutes.post("/auth/login", (req, res) => loginController.handle(req, res));
authRoutes.get("/auth/logout", (req, res) => logoutController.handle(req, res));


export { authRoutes };
