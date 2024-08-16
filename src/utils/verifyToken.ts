import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTToken } from "@/utils/types";

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

