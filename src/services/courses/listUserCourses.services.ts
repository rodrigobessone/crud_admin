import { QueryResult } from "pg";
import { AppError } from "../../error/AppError";
import format from "pg-format";
import { client } from "../../database";

export const getCourseByUser = async (courseId: number) => {
  const courseExistsQuery = "SELECT * FROM courses WHERE id = $1";
  const courseResult: QueryResult = await client.query(courseExistsQuery, [
    courseId,
  ]);
  if (courseResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }
  const query = format(
    `
        SELECT
          "users"."id" AS "userId",
          "users"."name" AS "userName",
          "courses"."id" AS "courseId",
          "courses"."name" AS "courseName",
          "courses"."description" AS "courseDescription",
          "userCourses"."active" AS "userActiveInCourse"
        FROM "userCourses"
        JOIN "users" ON "userCourses"."userId" = "users"."id"
        JOIN "courses" ON "userCourses"."courseId" = "courses"."id"
        WHERE "userCourses"."courseId" = %L
        `,
    courseId,
  );
  const result = await client.query(query);
  return result;
};
