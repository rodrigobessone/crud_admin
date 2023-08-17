import { z } from "zod";
import { LoginSchemaReq, LoginSchemaRes } from "../schemas/login.schemas";

type TLoginRequest = z.infer<typeof LoginSchemaReq>;
type TLoginResponse = z.infer<typeof LoginSchemaRes>;

export { TLoginRequest, TLoginResponse };
