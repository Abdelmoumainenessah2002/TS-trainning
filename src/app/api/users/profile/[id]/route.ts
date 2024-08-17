import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/Dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchema";

interface Props {
  params: {
    id: string;
  };
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @description Delete user
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        comments: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // function to verify token
    const userFromToken = verifyToken(request);

    if (userFromToken != null && userFromToken.id === user.id) {
      await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      // Delete the comments of the user
      const commentsIds = user?.comments.map((comment) => comment.id);

      await prisma.comment.deleteMany({
        where: {
          id: {
            in: commentsIds,
          },
        },
      });

      return NextResponse.json({ message: "User removed successfully" });
    }

    return NextResponse.json(
      { message: "You are not authorized to delete this user , //forbidden" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internel server error" },
      { status: 500 }
    );
  }
}



/**
 * @method GEt
 * @route ~/api/users/profile/:id
 * @description GET Profile by ID
 * @access private
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id != user.id) {
      return NextResponse.json(
        { message: "You are not authorized to view this user" },
        { status: 403 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internel server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @description Update user Profile
 * @access private
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id != user.id) {
      return NextResponse.json(
        { message: "You are not authorized to update this user" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateUserDto;

    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    if (body.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (emailExists) {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }
    }

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internel server error" },
      { status: 500 }
    );
  }
}
