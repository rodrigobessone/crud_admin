import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../error/AppError";

export const checkUserExists = async (userId: number) => {
  const checkUserQuery = format(
    'SELECT * FROM "users" WHERE "id" = %L',
    userId,
  );
  const userExistsResult = await client.query(checkUserQuery);

  if (userExistsResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }
  return userExistsResult;
};
