import { getAllComments } from '@/app/apiCalles/AdminApiCall';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { Comment } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import DeleteCommentButton from './DeleteCommentButton';

const AdminCommentsTable = async () => {
  const token = cookies().get("authToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);

  if (payload?.isAdmin === false) {
    redirect("/");
  }

  
  const comments: Comment[] = await getAllComments(token);


  return (
    <div className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 text-xl">
          <tr className="">
            <th className="p-2">Comment</th>
            <th className="hidden lg:inline-block p-3">Createed At</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {comments.map((comment) => (
            <tr key={comment.id} className="border-b border-t border-gray-300 ">
              <td className="p-3 text-gray-700">{comment.text}</td>
              <td className="p-3 text-gray-700 font-normal hidden lg:inline-block">
                {new Date(comment.createdAt).toDateString()}
              </td>
              <td className="">
                <DeleteCommentButton commentId={comment.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCommentsTable