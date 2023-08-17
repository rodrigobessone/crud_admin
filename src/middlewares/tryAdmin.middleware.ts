import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, Secret } from "jsonwebtoken";
import { AppError } from "../error/AppError";
import { PayloadToken } from "../interfaces/user.interfaces";

export const tryAdminMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY as Secret,
    ) as PayloadToken;

    if (!decodedToken.admin) {
      throw new AppError("Insufficient permission", 403);
    }

    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new AppError("Invalid token", 401);
    }

    throw error;
  }
};
