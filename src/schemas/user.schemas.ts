import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional(),
});

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  admin: z.boolean(),
});

export type UserSchema = z.infer<typeof userSchema>;
