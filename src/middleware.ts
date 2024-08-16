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

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/users/profile/:path*"],
};
