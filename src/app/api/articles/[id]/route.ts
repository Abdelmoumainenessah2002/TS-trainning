import { UpdateArticleDto } from "@/utils/Dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";



interface Props {
  params: {
    id: string;
  };
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @description Get single article by id
 * @access public
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    // Find article by id
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(params.id)},
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc'
          },
        },
      }
    });

    if (!article) { 
      return NextResponse.json({ message: "Article not found" },{ status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" },{ status: 500 });
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @description Update single article by id
 * @access Private (Admin)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);
    
    if (user === null || user.isAdmin == false) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as UpdateArticleDto;

    const updatedArticle = await prisma.article.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json({ updatedArticle }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}



/**
 * @method Delete
 * @route ~/api/articles/:id
 * @description Delete single article by id
 * @access Private (Admin)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include : {
        comments: true
      }
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);

    if (user === null || user.isAdmin == false) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }
    
    // Delete article
    await prisma.article.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    //Delete The Comments of this article
    const commentsIds = article?.comments.map(comment => comment.id);
    
    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentsIds
        }
      }
    });

    return NextResponse.json({ message: "Article Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
