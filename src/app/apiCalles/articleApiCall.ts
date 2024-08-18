import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

// Get Articles based on pageNumber
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
  const response = await fetch(
    `http://localhost:3000/api/articles?pageNumber=${pageNumber}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return await response.json();
}


// Get Articles Count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`http://localhost:3000/api/articles/count`);

  if (!response.ok) {
    throw new Error("Failed to get articles count");
  }

  const {count} = await response.json() as {count:number};
  return count
}


// Get Articles based on searchText
export async function getArticlesBasedOnSearch(searchText: string | undefined): Promise<Article>{
  const response = await fetch(
    `http://localhost:3000/api/articles/search?searchText=${searchText}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return await response.json();
}


// Get Single Article
export async function getSingleArticle(articleID: string | undefined): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleID}`,
    {cache: 'no-store'}
  );

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return await response.json();
}





