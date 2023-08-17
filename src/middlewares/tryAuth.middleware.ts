import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../schemas/login.schemas";
import { checkEmailQuery } from "../services/validation/checkEmailQuery.services";
import { AppError } from "../error/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const tryAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userData: LoginSchema = req.body;

  const findUser = await checkEmailQuery(userData.email);
  const user = findUser.rows[0];
  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  const passCompare = await bcrypt.compare(
    userData.password,
    findUser.rows[0].password,
  );

  if (!passCompare) {
    throw new AppError("Wrong email/password", 401);
  }
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    throw new AppError("Secret key is missing", 500);
  }

  const token = jwt.sign({ userId: user.id }, secret, {
    expiresIn: process.env.EXPIRES_IN,
  });

  res.locals.token = token;

  return next();
};
