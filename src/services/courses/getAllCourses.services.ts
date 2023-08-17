import { QueryResult } from "pg";
import { client } from "../../database";

export const getAllCoursesQuery = async (): Promise<QueryResult<any>> => {
  const query = "SELECT * FROM courses";
  const result: QueryResult<any> = await client.query(query);
  return result;
};
