import { UpdateArticleDto } from "@/utils/Dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";



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
        id: parseInt(params.id),
      },
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
 * @access public
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
 * @access public
 */

export async function DELETE(request: NextRequest, { params }: Props) {
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

    await prisma.article.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: "Article Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
