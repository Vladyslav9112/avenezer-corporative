import jwt, { type JwtPayload } from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET in .env");
  return secret;
}

export type AuthTokenPayload = {
  sub: string; // userId
  email: string;
};

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "30d" });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;

  const sub = decoded.sub;
  const email = decoded.email;

  if (typeof sub !== "string" || typeof email !== "string") {
    throw new Error("Invalid auth token payload.");
  }

  return { sub, email };
}
