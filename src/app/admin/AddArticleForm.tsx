"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";


const AddArticleForm = () => {
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title === "") return toast.error("title is required");
    if (description === "") return toast.error("Description is required");

    try {
      await axios.post(`${DOMAIN}/api/articles`, {title, description});
      setTitle("");
      setDescription("");
      toast.success("Article Created Succefuly");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <input
        type="text"
        className="mt-4 border rounded p-2 text-xl"
        placeholder="Enter The Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="my-4 p-2 lg:text-xl rounded resize-none"
        placeholder="Enter The Description"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        
      </textarea>
      <button
        type="submit"
        className="mt-4 bg-blue-700 text-white text-2xl p-2 rounded w-3/4 mx-auto hover:bg-blue-900 transition"
      >
        Add Article
      </button>
    </form>
  );
};

export default AddArticleForm;
