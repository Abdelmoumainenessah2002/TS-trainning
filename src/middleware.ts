import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  const jwtToken = request.cookies.get("authToken");
  const authToken = jwtToken?.value as string;

  if (!authToken) {
    return NextResponse.json(
      { message: "not Token provided" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/users/profile/:path*", // Matches /api/users/profile and any sub-paths
    "/api/comments/:path*", // Matches /api/comments and any sub-paths
  ],
};
