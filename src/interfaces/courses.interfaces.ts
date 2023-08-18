import { z } from "zod";

const Course = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const PayloadToken = z.object({
  admin: z.boolean(),
});

export type Course = z.infer<typeof Course>;
export type PayloadToken = z.infer<typeof PayloadToken>;