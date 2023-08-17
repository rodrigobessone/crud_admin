import { QueryResult } from "pg";
import format from "pg-format";
import { checkUserExists } from "../validation/checkUserExist.services";
import { client } from "../../database";

export const fetchCoursesForUser = async (userId: number) => {
  await checkUserExists(userId);
  const query = format(
    `
      SELECT
        u."id" AS "userId",
        u."name" AS "userName",
        c."id" AS "courseId",
        c."name" AS "courseName",
        c."description" AS "courseDescription",
        uc."active" AS "userActiveInCourse"
      FROM
        "users" u
        JOIN "userCourses" uc ON u."id" = uc."userId"
        JOIN "courses" c ON uc."courseId" = c."id"
      WHERE
        u."id" = %L;
    `,
    userId,
  );

  const result = await client.query(query);
  return result;
};
