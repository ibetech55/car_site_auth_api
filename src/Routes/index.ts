import { Router } from "express";
import { authRoutes } from "./auth";

const apiRoutes = Router();
apiRoutes.use([authRoutes])

export { apiRoutes };