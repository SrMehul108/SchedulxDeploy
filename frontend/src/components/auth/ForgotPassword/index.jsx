import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../apis/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/api/v1/auth/password-reset", { email });
      if (response.data.message) {
        setSuccess(response.data.message); 
        setTimeout(() => navigate("/otp"), 2000); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="antialiased grid place-items-center h-screen">
      <div className="w-1/4 mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 dark:bg-bgCopnents">
        <h1 className="text-4xl font-bold text-center">Forgot Password</h1>
        <p className="text-slate-500 text-center mt-2 dark:text-white">
          Enter your email to reset your password.
        </p>

        <form className="mt-5 flex flex-col space-y-5" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Email address</p>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-ScocilMCompnent"
              placeholder="Enter email address"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-gray-950 hover:bg-gray-900 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11V17M12 7L12 7M12 17L12 17M12 21C16.4183 21 20 16.4183 20 12C20 7.58172 16.4183 3 12 3C7.58172 3 4 7.58172 4 12C4 16.4183 7.58172 21 12 21Z"
              />
            </svg>
            <span>Send OTP</span>
          </button>

          <p className="text-center">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
            >
              <span>Login</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;