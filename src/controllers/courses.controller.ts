import { Request, Response } from "express";
import { z } from "zod";
import { createCourseQuery } from "../services/courses/createCourse.services";
import { getAllCoursesQuery } from "../services/courses/getAllCourses.services";
import { deleteUserFromCourseQuery } from "../services/courses/deleteUserFromCourse.services";
import { AppError } from "../error/AppError";
import { addUserToCourseQuery } from "../services/courses/addUserToCouser.services";
import { getCourseByUser } from "../services/courses/listUserCourses.services";

export const createCourseController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const queryResult = await createCourseQuery(name, description);

    const createdCourse = {
      id: queryResult.id,
      name: queryResult.name,
      description: queryResult.description,
    };

    res.status(201).json(createdCourse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.flatten().fieldErrors);
    } else {
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

export const listAllCoursesController = async (
  _req: Request,
  res: Response,
) => {
  const courses = await getAllCoursesQuery();
  res.status(200).json(courses.rows);
};

export const addUserToCourseController = async (
  req: Request,
  res: Response,
) => {
  const courseId = Number(req.params.courseId);
  const userId = Number(req.params.userId);

  await addUserToCourseQuery(courseId, userId);
  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const deleteCourseUserController = async (
  req: Request,
  res: Response,
) => {
  const { courseId, userId } = req.params;

  await deleteUserFromCourseQuery(Number(courseId), Number(userId));

  res.status(204).send();
};
export const listUsersCoursesController = async (
  req: Request,
  res: Response,
) => {
  const courseId = Number(req.params.courseId);

  const coursesByUser = await getCourseByUser(courseId);

  res.status(200).json(coursesByUser.rows);
};
