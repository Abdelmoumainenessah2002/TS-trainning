'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { DOMAIN } from '@/utils/constants'

interface  DeleteArticleButtonProps {
  articleId: number
}



const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("Are you sure want to delete this article?")) {
        await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
        router.refresh();
        toast.success("article deleted");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  }
  
  return (
    <div className="bg-red-600 rounded-lg text-white cursor-pointer inline-block text-center py-2 px-3 hover:bg-red-800 transition" onClick={deleteArticleHandler}>
      Delete
    </div>
  );
};

export default DeleteArticleButton