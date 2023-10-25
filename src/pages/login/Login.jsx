import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div className="w-auto h-screen flex items-center justify-center flex-col">
      <h1 className="text-white font-bold mb-5 text-4xl">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-input-box"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-input-box"
          />
        </div>
        <button
          type="submit"
          className="bg-pink-400 px-8 py-4 rounded-3xl text-white mt-10 transform transition-all duration-300 hover:-translate-y-2 hover:bg-pink-500"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
