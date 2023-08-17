import { NextFunction, Request, Response } from "express";
import { loginSchemaDuo } from "../schemas/login.schemas";
import { ZodError, z } from "zod";

export const loginUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loginSchemaDuo.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    const zodError = error as ZodError;
    res.status(400).json(zodError.flatten().fieldErrors);
  }
};
