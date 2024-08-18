'use client'
import axios from "axios"
import { DOMAIN } from "@/utils/constants";
import {toast} from 'react-toastify'
import { useRouter } from "next/navigation";


const LougoutButton = () => {

  const router = useRouter()
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`)
      router.push('/login')
      router.refresh()
    } catch (error) {
     toast.warning("Something went wrong");
     console.log(error);
      
    }
  }

  return (
    <button
      className="bg-gray-700 text-gray-200 p-2 rounded hover:bg-gray-500 ml-2"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LougoutButton