import { NextRequest , NextResponse } from "next/server";
import { cookies } from 'next/headers'

/**
 * @method GET
 * @route ~/api/users/logout
 * @description Logout user [clear cookie]
 * @access public
 */



export async function GET(request: NextRequest) {
  try {
    cookies().delete("authToken");
    return NextResponse.json({ message: "logout successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}