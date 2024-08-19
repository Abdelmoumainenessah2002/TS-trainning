'use client'
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation"
import {toast} from 'react-toastify'

interface DeleteCommentButtonProps {
    commentId: number
}

const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
  
  const router = useRouter();
  
  const deleteCommentHandler = async () => {
    try {
      if (confirm("Are you sure want to delete this article?")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("comment deleted");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };
  
    return (
      <div
        className="bg-red-600 rounded-lg text-white cursor-pointer inline-block text-center py-2 px-3 hover:bg-red-800 transition"
        onClick={deleteCommentHandler}
      >
        Delete
      </div>
    );
};

export default DeleteCommentButton