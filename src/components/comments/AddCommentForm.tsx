"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";


interface AddCommentFormProps {
    articleId : number
} 

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter()
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") {
      return toast.error("Comment cannot be empty");
    }

    try {
      await axios.post(`${DOMAIN}/api/comments/`, {text, articleId})
      router.refresh()
      setText("")
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
    
  };

  return (
    <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
      <input
        type="text"
        className="rounded-lg text-xl w-full p-2 border border-gray-300 focus:outline-none focus:shadow-md"
        placeholder="Add a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold text-xl w-full mt-3 p-2 rounded-lg hover:bg-blue-600"
      >
        Add Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
