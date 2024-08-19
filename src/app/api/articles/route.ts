import { CreateArticleDto } from "@/utils/Dtos";
import { createArticleSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { Article} from "@prisma/client";
import prisma from "@/utils/db";
import { articlePerPage } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/*------------------------------------------------------------------------------------------------*/

/**
 * @method GET
 * @route ~/api/articles
 * @description Get Articles By Page Number
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber");
    
    const articles = await prisma.article.findMany({
      skip: pageNumber ? (parseInt(pageNumber) - 1) * articlePerPage : 0,
      take: articlePerPage,
      orderBy: {createdAt : 'desc'}
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" },{ status: 500 });
  }
}

/*------------------------------------------------------------------------------------------------*/

/**
 * @method POST
 * @route ~/api/articles
 * @description Create a new article
 * @access Private (Admin)
 */

export async function POST(request: NextRequest) {
  try {

    const user = verifyToken(request);

    if (user === null || user.isAdmin == false) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
