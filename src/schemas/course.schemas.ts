import { z } from "zod";

export const schemaCourseRes = z.object({
  courseId: z.number(),
  courseName: z.string(),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean(),
  userId: z.number(),
  userName: z.string(),
});

export const schemaCreateCourse = z.object({
  name: z.string(),
  description: z.string(),
});

export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type CourseSchema = z.infer<typeof courseSchema>;
