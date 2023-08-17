import { z } from "zod";

const LoginSchemaReq = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});

const LoginSchemaRes = z.object({
  token: z.string(),
});

export type LoginSchema = z.infer<typeof LoginSchemaReq>;

const loginSchemaDuo = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { LoginSchemaReq, LoginSchemaRes, loginSchemaDuo };
