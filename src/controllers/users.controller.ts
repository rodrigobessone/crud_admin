import { Request, Response } from "express";
import { UserSchema, userResponseSchema } from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import { createUserQuery } from "../services/users/createrUser.service";
import { getUsersQuery } from "../services/users/getUser.service";
import { AppError } from "../error/AppError";
import { schemaCourseRes } from "../schemas/course.schemas";
import { fetchCoursesForUser } from "../services/users/getCoursesForUser.service";
import { LoginSchemaRes } from "../schemas/login.schemas";

export const createUserController = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const validatedData: UserSchema = req.body;

  const toCreateUser: UserSchema = {
    ...validatedData,
    password: hashedPassword,
  };

  const queryResult = await createUserQuery(toCreateUser);

  const createdUser = userResponseSchema.parse({
    id: queryResult.id,
    name: queryResult.name,
    email: queryResult.email,
    admin: queryResult.admin,
  });

  return res.status(201).json(createdUser);
};

export const showAllUsers = async (req: Request, res: Response) => {
  const queryResult = await getUsersQuery();
  const users = queryResult.rows;
  const sanitizedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    admin: user.admin,
  }));

  res.status(200).json(sanitizedUsers);
};

export const showCoursesByUsersController = async (
  req: Request,
  res: Response,
) => {
  const userId = Number(req.params.id);
  const userCourses = await fetchCoursesForUser(userId);

  if (userCourses.rowCount === 0) {
    throw new AppError("No course found", 404);
  }
  const response = userCourses.rows.map((courses) =>
    schemaCourseRes.parse(courses),
  );
  return res.status(200).json(response);
};

export const loginUserController = async (req: Request, res: Response) => {
  const token = res.locals.token;
  const response = LoginSchemaRes.parse({ token });
  return res.status(200).json(response);
};
