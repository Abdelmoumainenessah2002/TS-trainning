"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "" || username === "") {
      return toast.error("Please fill in all fields");
    }

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password is hidden");
  };

  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
        <input
            type="text"
            className="border rounded p-2 text-xl"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
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
        type="submit"
        className="mt-4 bg-blue-800 text-white text-2xl p-2 rounded w-3/4 mx-auto"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
