import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/utils/validationSchema";
import { setCookie } from "@/utils/generateToken";
import { LoginUserDto } from "@/utils/Dtos";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

/**
 * @method POST
 * @route ~/api/users/login
 * @description Login user
 * @access public
*/

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // check if user exists
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(body.password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    } 

    // generate JWT token
    const cookie = setCookie({
        id: user.id,
        username: user.username,
        isAdmin : user.isAdmin
    });

    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal server error"}, { status: 500 });
  }
}
