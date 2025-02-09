import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContex } from "./contex/AuthContex";
import { BACKEND_URL } from "./constant/Api";

const Registration = () => {
  const nameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const confirmpasswordref = useRef(null);
  const genderref = useRef(null);

  const { setAuthUser } = useAuthContex();

  const handleBackend = async () => {
    try {
      const user = {
        name: nameref.current.value,
        email: emailref.current.value,
        password: passwordref.current.value,
        ConfirmPassword: confirmpasswordref.current.value,
        gender: genderref.current.value,
      };

      const result = await axios.post(`${BACKEND_URL}/api/auth/signup`, user);

      localStorage.setItem("chat-User", JSON.stringify(result.data));
      setAuthUser(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-slate-800 to-black-300  flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-slate-200 bg-opacity-85 shadow-lg rounded-lg p-6 md:p-10">

        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Create an Account</h1>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Name</label>
              <input
                ref={nameref}
                type="text"
                placeholder="Enter your full name"
                className="w-[200%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                ref={emailref}
                type="email"
                placeholder="Enter your email"
                className="w-[200%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                ref={passwordref}
                type="password"
                placeholder="Enter your password"
                className="w-[200%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                ref={confirmpasswordref}
                type="password"
                placeholder="Confirm your password"
                className="w-[200%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Gender</label>
              <select
                ref={genderref}
                className="w-[200%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Agreement */}
            <div className="flex items-start space-x-2">
              <input type="checkbox" required />
              <p className="text-sm text-gray-600">I agree to the processing of personal data</p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleBackend}
              className="w-[200%] bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Create Account
            </button>

            {/* Login Redirect */}
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
