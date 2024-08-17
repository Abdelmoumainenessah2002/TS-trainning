import { NextRequest , NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDto } from "@/utils/Dtos";
import { createCommentSchema } from "@/utils/validationSchema";


/**
 * @method: POST
 * @route : /api/comments
 * @description: Create a new comment
 * @access: Private
*/

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as CreateCommentDto;

    const validation = createCommentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Create a new comment
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment , { status: 201 });


  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method: GET
 * @route : /api/comments
 * @description: Get all comments
 * @access: Private (Only Admins)
*/

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json({ message: "Unauthorized, only admins" }, { status: 403 });
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments , { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


