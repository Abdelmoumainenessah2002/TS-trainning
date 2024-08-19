import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { articlePerPage } from "@/utils/constants";
import { Article } from "@prisma/client";
import Link from "next/link";
import { getArticles, getArticlesCount } from "@/app/apiCalles/articleApiCall";
import Pagination from "@/components/articles/Pagination";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/utils/db";

interface AdminArticlesTableProps {
  searchParams : {pageNumber: string}
}

const AdminArticlesTable = async ({ searchParams: {pageNumber} }: AdminArticlesTableProps) => {
  const token = cookies().get("authToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);

  if (payload?.isAdmin === false) {
    redirect("/");
  }


  const articles :Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / articlePerPage);
  console.log(pages);
  

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 text-xl">
          <tr>
            <th className="p-2">Title</th>
            <th className="hidden lg:inline-block p-3">Createed At</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <Link
                  className="bg-green-600 text-white rounded-lg py-2 px-3 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                  href={`/admin/articles-table/edit/${article.id}`}
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link
                  className="text-white bg-blue-600 rounded-lg p-2 mt-1 block hover:bg-blue-800"
                  href={`/articles/${article.id}`}
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/articles-table"
      />
    </section>
  );
};

export default AdminArticlesTable;
