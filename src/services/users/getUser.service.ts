import { QueryResult } from "pg";
import { client } from "../../database";

export const getUsersQuery = async (): Promise<QueryResult> => {
  const query = "SELECT id, name, email, admin FROM users";
  const result: QueryResult = await client.query(query);
  return result;
};
