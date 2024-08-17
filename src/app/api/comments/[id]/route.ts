import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/Dtos";

interface Props {
    params: {
        id: string;
    };
}

/**
 * @method: Put
 * @route : /api/comments/[id]
 * @description: Update a comment
 * @access: Private 
*/

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    
    const { id } = params;

    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" },{ status: 404 });
    }

    const user = verifyToken(request);

    if (user === null || user.id !== comment.userId) {
      return NextResponse.json({ message: "Unauthorized, access denied" }, { status: 403 });
    }

    const body = (await request.json()) as UpdateCommentDto;

    if (!body.text) {
      return NextResponse.json({ message: "Text is required" }, { status: 400 });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


/**
 * @method: Delete
 * @route : /api/comments/[id]
 * @description: Delete a comment
 * @access: Private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" },{ status: 404 });
    }

    const user = verifyToken(request);

    if (user === null) {
      return NextResponse.json({ message: "Unauthorized, access denied" }, { status: 403 });
    }

    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({
        where: {
          id: Number(id),
        },
      });

      return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
    }

    return NextResponse.json({ message: "Unauthorized, access denied" }, { status: 403 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}