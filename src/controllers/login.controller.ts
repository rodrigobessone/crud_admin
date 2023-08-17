import { Request, Response } from "express";
import { LoginSchemaRes } from "../schemas/login.schemas";

export const loginUserController = async (req: Request, res: Response) => {
  const token = res.locals.token;
  const response = LoginSchemaRes.parse({ token });
  return res.status(200).json(response);
};
