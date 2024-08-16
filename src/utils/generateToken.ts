import jwt from "jsonwebtoken";
import { JWTToken } from "./types";
import { serialize } from "cookie";



function generateToken(payload: JWTToken) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
}

export default generateToken;


// Create cookie
export function setCookie(jwtPayload: JWTToken): string {
  const token = generateToken(jwtPayload);
  const cookie = serialize("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });


  return cookie;
}
