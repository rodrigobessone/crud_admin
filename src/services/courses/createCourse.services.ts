import format from "pg-format";
import { client } from "../../database";
import { CourseSchema } from "../../schemas/course.schemas";

export const createCourseQuery = async (
  name: string,
  description: string,
): Promise<CourseSchema> => {
  const query = format(
    "INSERT INTO courses (name, description) VALUES (%L, %L) RETURNING *",
    name,
    description,
  );

  const result = await client.query(query);
  return result.rows[0];
};
