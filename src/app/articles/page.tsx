import { Article } from "@prisma/client";
import ArticleItem from "@/components/articles/Article";
import React from "react";
import { Metadata } from "next";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import Pagination from "@/components/articles/Pagination";
import { getArticles, getArticlesCount } from "../apiCalles/articleApiCall";
import { articlePerPage } from "@/utils/constants";

interface ArticlesPageProps {
  searchParams: { pageNumber: string };
}


const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const { pageNumber } = searchParams;
  const articles : Article[] = await getArticles (pageNumber);
  const count: number = await getArticlesCount();

  const pages = Math.ceil(count / articlePerPage);

  return (
    <div>
      <section className="container m-auto px-5 ">
        <SearchArticleInput />
        <div className="flex items-center justify-center flex-wrap gap-7">
          {articles.map((item) => (
            <ArticleItem article={item} key={item.id} />
          ))}
        </div>
        <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages} />
      </section>
    </div>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles About programming",
};
