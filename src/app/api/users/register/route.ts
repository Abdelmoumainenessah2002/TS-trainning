import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/utils/validationSchema";
import { setCookie } from "@/utils/generateToken";
import { RegisterUserDto } from "@/utils/Dtos";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";


/**
 * @method POST
 * @route ~/api/users/register
 * @description Create new user [register, Signup]
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // create new user
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });

    // generate JWT token
    const cookie = setCookie({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });

    return NextResponse.json({ ...newUser, cookie }, { status: 201, headers: { "Set-Cookie": cookie } });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}