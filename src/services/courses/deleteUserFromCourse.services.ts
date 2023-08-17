import format from "pg-format";
import { client } from "../../database";
import { QueryResult } from "pg";
import { AppError } from "../../error/AppError";

export const deleteUserFromCourseQuery = async (
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

  const query = format(
    `UPDATE "userCourses" SET active = false WHERE "courseId" = %L AND "userId" = %L`,
    courseId,
    userId,
  );
  const result = await client.query(query);
  return result;
};
