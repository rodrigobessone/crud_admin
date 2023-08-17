import express from "express";
import userRoutes from "./users.routes";
import coursesRoute from "./courses.routes";
import { loginUserController } from "../controllers/users.controller";
import { tryAuthMiddleware } from "../middlewares/tryAuth.middleware";
import { tryBodyMiddleware } from "../middlewares/tryBody.middleware";
import { LoginSchemaReq } from "../schemas/login.schemas";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/courses", coursesRoute);
router.use(
  "/login",
  tryBodyMiddleware(LoginSchemaReq),
  tryAuthMiddleware,
  loginUserController,
);
export default router;
