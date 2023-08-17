import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../error/AppError";
import { TUser } from "../../__tests__/mocks/interfaces";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
const createSessionService = async (
  userData: TLoginRequest,
): Promise<TLoginResponse> => {
  const queryString: string = `
    
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userData.email],
  };
  const queryRestult: QueryResult<TUser> = await client.query(queryConfig);
  const user = queryRestult.rows[0];
  if (queryRestult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword: boolean = await bcrypt.compare(
    userData.password,
    user.password,
  );

  if (comparePassword !== true) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN!,
      subject: user.id.toString(),
    },
  );

  return { token };
};

export default createSessionService;
