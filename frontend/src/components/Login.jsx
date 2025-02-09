import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContex } from "./contex/AuthContex";
import { BACKEND_URL } from "./constant/Api";

const Login = () => {
  const { setAuthUser } = useAuthContex();
  const emailref = useRef(null);
  const passwordref = useRef(null);

  const handleLoginbackend = async () => {
    try {
      const loginUser = {
        email: emailref.current.value,
        password: passwordref.current.value,
      };

      const result = await axios.post(`${BACKEND_URL}/api/auth/login`, loginUser);
      if (result.status === 200 && result.data) {
        localStorage.setItem("chat-User", JSON.stringify(result.data));
        setAuthUser(result.data);
        alert("Login successful!");
      } else {
        alert("Invalid login credentials.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-slate-800 to-black-300 flex items-center justify-center">
      <div className="bg-slate-200 bg-opacity-85 shadow-lg rounded-lg w-full max-w-md p-8 md:p-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-700 text-center">Welcome Back!</h1>
          <p className="text-center text-gray-600">Log in to access your account</p>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-blue-900">Email Address</span>
            <input
              ref={emailref}
              type="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-blue-900">Password</span>
            <input
              ref={passwordref}
              type="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </p>
          <Link to="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-6">
          <button
            onClick={handleLoginbackend}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-300 hover:scale-105"
          >
            Log In
          </button>
        </div>
        <p className="text-sm text-center text-gray-600 mt-4">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
