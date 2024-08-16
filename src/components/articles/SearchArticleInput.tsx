"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const SearchArticleInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");


  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    router.push(`/articles/search/?searchText=${searchText}`);
 
  };

  return (
    <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
      <input
        type="search"
        className="w-full p-3 border text-xl border-none text-gray-900 rounded-md"
        placeholder="Search for articles"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchArticleInput;
