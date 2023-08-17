import { JwtPayload } from "jsonwebtoken";

export interface PayloadToken extends JwtPayload {
  admin: boolean;
}
