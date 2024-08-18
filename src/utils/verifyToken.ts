import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTToken } from "@/utils/types";

// Verify token for API
export function verifyToken(request: NextRequest): JWTToken | null {
    try {
        const jwtToken = request.cookies.get("authToken");
        const token = jwtToken?.value as string;

        if (!token) {
            return null;
        }

        const privateKey = process.env.JWT_SECRET as string;
        const userPayload = jwt.verify(token, privateKey) as JWTToken;

        return userPayload;

    } catch (error) {
        return null;
    }
}


// verify Token for Page
export function verifyTokenForPage(token: string): JWTToken | null {
  try {

    if (!token) {
      return null;
    }
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTToken;

    if (!userPayload) {
        return null;
    }

    return userPayload;
  } catch (error) {
    return null;
  }
}