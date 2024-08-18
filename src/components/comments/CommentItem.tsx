import { CommentWithUser } from '@/utils/types'
import {FaEdit, FaTrash} from 'react-icons/fa'

interface CommentItemProps {
    comment: CommentWithUser, 
}

const CommentItem = ({ comment }: CommentItemProps) => {
    
    console.log(comment);
    
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
      <div className="flex justify-end to-current">
        <FaEdit className="text-green-600 text-xl cursor-pointer me-3" />
        <FaTrash className="text-red-600 text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default CommentItem