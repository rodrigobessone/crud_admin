import { QueryResult } from "pg";
import { UserSchema } from "../../schemas/user.schemas";
import format from "pg-format";
import { client } from "../../database";

export const createUserQuery = async (
  user: UserSchema,
): Promise<UserSchema> => {
  const query = format(
    `INSERT INTO users (name, email, password, admin) 
     VALUES (%L, %L, %L, %L) RETURNING *;
     `,
    user.name,
    user.email,
    user.password,
    user.admin,
  );

  const result: QueryResult = await client.query(query);
  return result.rows[0];
};
