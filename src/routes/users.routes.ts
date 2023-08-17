import express from "express";
import { tryBodyMiddleware } from "../middlewares/tryBody.middleware";
import {
  createUserController,
  showAllUsers,
  showCoursesByUsersController,
} from "../controllers/users.controller";
import { userSchema } from "../schemas/user.schemas";
import { tryEmailMiddleware } from "../middlewares/tryEmail.middleware";
import { tryAdminMiddleware } from "../middlewares/tryAdmin.middleware";
import { loginUserController } from "../controllers/login.controller";
import { loginUserMiddleware } from "../middlewares/loginUser.middleware";

const router = express.Router();

router.post(
  "/",
  tryBodyMiddleware(userSchema),
  tryEmailMiddleware,
  createUserController,
);
router.get("/", tryAdminMiddleware, showAllUsers);
router.get("/:id/courses", tryAdminMiddleware, showCoursesByUsersController);
router.post("/login", loginUserMiddleware, loginUserController);

export default router;
