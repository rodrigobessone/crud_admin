import { QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error/AppError";

export const addUserToCourseQuery = async (
  courseId: number,
  userId: number,
): Promise<QueryResult> => {
  const courseExistsQuery = "SELECT * FROM courses WHERE id = $1";
  const userExistsQuery = "SELECT * FROM users WHERE id = $1";

  const courseResult: QueryResult = await client.query(courseExistsQuery, [
    courseId,
  ]);
  const userResult: QueryResult = await client.query(userExistsQuery, [userId]);

  if (courseResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  if (userResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  const addUserToCourseQuery = `
        INSERT INTO "userCourses" ("courseId", "userId", active)
        VALUES ($1, $2, $3)
      `;

  const result = await client.query(addUserToCourseQuery, [
    courseId,
    userId,
    true,
  ]);

  return result;
};
