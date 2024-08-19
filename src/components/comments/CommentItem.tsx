'use client'
import { CommentWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModel from "./UpdateCommentModel";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface CommentItemProps {
  comment: CommentWithUser,
  userId: number | undefined
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false)

  const commentDeleteHandler = async () => {
    try {
      if(confirm("Are you sure want to delete this comment ?")) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
      }
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  }

  return (
    <div className="mb-5 rounded-lg bg-gray-200 border-2 border-gray-300 p-2">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg to-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className=" to-gray-800 mb-2">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end to-current">
          <FaEdit
            onClick={() => setOpen(true)}
            className="text-green-600 text-xl cursor-pointer me-3 hover:cursor-pointer"
          />
          <FaTrash
            onClick={commentDeleteHandler}
            className="text-red-600 text-xl cursor-pointer"
          />
        </div>
      )}
      {open && (
        <UpdateCommentModel
          text={comment.text}
          commentId={comment.id}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default CommentItem;
