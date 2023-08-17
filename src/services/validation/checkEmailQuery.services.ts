import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";

export const checkEmailQuery = async (email: string): Promise<QueryResult> => {
  const query = format(`SELECT * FROM users WHERE email = %L`, email);
  const result: QueryResult = await client.query(query);
  return result;
};
