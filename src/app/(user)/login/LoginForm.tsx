'use client';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'
import { toast } from "react-toastify";
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import ButtonSpinner from '@/components/ButtonSpinner';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();

        if (email === '' || password === '') {
          return toast.error('Please fill in all fields');  
        }    

        try {
          setLoading(true)
          await axios.post(`${DOMAIN}/api/users/login`, {email, password} );
          router.replace("/");
          setLoading(false)
          router.refresh();
        } catch (error: any) {
          toast.error(error?.response?.data.message);
          console.log(error) 
          setLoading(false)
        }

        
    }

  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <input
        type="email"
        className="mt-4 border rounded p-2 text-xl"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="mt-4 border rounded p-2 text-xl"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={loading}
        type="submit"
        className="mt-4 bg-blue-800 text-white text-2xl p-2 rounded w-3/4 mx-auto"
      >
        {loading ? <ButtonSpinner /> : "Login"}
      </button>
    </form>
  );
}

export default LoginForm