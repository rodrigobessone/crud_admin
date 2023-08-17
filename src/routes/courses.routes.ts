import express from "express";
import { tryBodyMiddleware } from "../middlewares/tryBody.middleware";
import { tryAdminMiddleware } from "../middlewares/tryAdmin.middleware";
import {
  addUserToCourseController,
  createCourseController,
  deleteCourseUserController,
  listAllCoursesController,
  listUsersCoursesController,
} from "../controllers/courses.controller";
import { schemaCreateCourse } from "../schemas/course.schemas";

const router = express.Router();

router.post(
  "/",
  tryBodyMiddleware(schemaCreateCourse),
  tryAdminMiddleware,
  createCourseController,
);
router.get("/", listAllCoursesController);
router.get("/:courseId/users", tryAdminMiddleware, listUsersCoursesController);
router.post(
  "/:courseId/users/:userId",
  tryAdminMiddleware,
  addUserToCourseController,
);
router.delete(
  "/:courseId/users/:userId",
  tryAdminMiddleware,
  deleteCourseUserController,
);

export default router;
