import { getArticlesBasedOnSearch } from "@/app/apiCalles/articleApiCall";
import { Article } from "@prisma/client";
import  ArticleItem  from "@/components/articles/Article";

interface ArticlesPageSearchProps {
  searchParams: {
    searchText: string;
  }
}

const  ArticlesPageSearch = async ({searchParams: {searchText}}: ArticlesPageSearchProps) => {
  
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);

  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <h2 className="text-gray-800 text-2xl font-bold p-5">
          Articles Based On&nbsp;
          <span className="text-red-500">{searchText}</span>
          &nbsp;Not Found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">
            Article based on
            <span className="ms-1 text-green-700 text-3xl font-bold">
              {searchText}
            </span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((item) => (
              <ArticleItem key={item.id} article={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ArticlesPageSearch
