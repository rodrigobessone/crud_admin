import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { AppError } from "../error/AppError";
import { checkEmailQuery } from "../services/validation/checkEmailQuery.services";

export const tryEmailMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const existingUserEmail: QueryResult = await checkEmailQuery(email);

  if (existingUserEmail.rowCount > 0) {
    throw new AppError("Email already registered", 409);
  }
  return next();
};
