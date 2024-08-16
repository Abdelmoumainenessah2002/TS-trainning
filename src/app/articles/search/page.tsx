interface ArticlesPageSearchProps {
  searchParams: {
    searchText: string;
  }
}

function ArticlesPageSearch({searchParams}: ArticlesPageSearchProps) {
  

  return <section className="fix-height container m-auto px-5">
    <h1 className="text-2xl font-bold">
      Search text is: {searchParams.searchText}
    </h1>
  </section>;
}

export default ArticlesPageSearch
