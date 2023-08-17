import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { AppError } from "../error/AppError";

export const tryBodyMiddleware = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = schema.parse(req.body);

      req.body = validatedBody;

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(error.flatten().fieldErrors);
      }
      throw new AppError("Internal server error.", 500);
    }
  };
};
