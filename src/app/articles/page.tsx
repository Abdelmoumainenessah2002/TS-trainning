import {Article} from '@/utils/types'
import ArticleItem from '@/components/articles/Article'
import React from 'react'
import { Metadata } from 'next';
import SearchArticleInput from '@/components/articles/SearchArticleInput';
import Pagination from '@/components/articles/Pagination';

const ArticlesPage = async () => {

  await new Promise((resolve) => setTimeout(resolve, 1000));  

  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const articles:Article[] = await response.json();
  
  return (
    <div>
      <section className='container m-auto px-5 '>
        <SearchArticleInput />
        <div className='flex items-center justify-center flex-wrap gap-7'>
          {articles.slice(0,6).map(item => (
            <ArticleItem article={item} key= {item.id} />
          ))}
        </div>
        <Pagination />
      </section>
    </div>
  )
}

export default ArticlesPage


export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles About programming",
};
