import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  const jwtToken = request.cookies.get("authToken");
  const authToken = jwtToken?.value as string;

  if (!authToken) {
    if(request.nextUrl.pathname.startsWith('/api/users/profile/')){
      return NextResponse.json(
        { message: "not Token provided" },
        { status: 401 }
      );
    }
  }else {
    if(
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/",request.url))
    }
  }
}

export const config = {
  matcher: [
    "/api/users/profile/:path*", // Matches /api/users/profile and any sub-paths
    "/api/comments/:path*", // Matches /api/comments and any sub-paths
    "/login", "/register" //
  ],
};
