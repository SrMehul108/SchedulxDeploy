import React, { useState } from "react";
import { Icons } from "../../../constants/icons";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../apis/api";

const ConfirmPassword = () => {
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const otp = localStorage.getItem("verifiedOtp");

    if (!otp) {
      setError("OTP not found. Please restart the password reset process.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await api.post("/api/v1/auth/password-reset-otp", {
        otp, 
        password: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (response.data.message) {
        setSuccess("Password successfully updated!");

        localStorage.removeItem("verifiedOtp");

        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="antialiased grid place-items-center h-screen">
      <div className="w-1/4 mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 dark:bg-bgCopnents dark:text-white">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center dark:text-white">Set New Password</h1>
        <p className="text-slate-500 text-center mt-2 dark:text-white">
          Create a new password to secure your account.
        </p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {/* Form */}
        <form className="mt-5 flex flex-col space-y-5" onSubmit={handleSubmit}>
          {/* New Password */}
          <label htmlFor="newPassword">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">New Password</p>
            <div className="relative flex items-center">
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-ScocilMCompnent"
                placeholder="Enter new password"
                required
              />
              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? Icons.eye : Icons.eye}
              </div>
            </div>
          </label>
          {/* Confirm Password */}
          <label htmlFor="confirmPassword">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Confirm Password</p>
            <div className="relative flex items-center">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-ScocilMCompnent"
                placeholder="Re-enter new password"
                required
              />
              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? Icons.eye : Icons.eye}
              </div>
            </div>
          </label>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-gray-950 hover:bg-gray-900 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <span>Continue</span>
          </button>
          {/* Back to Login */}
          <p className="text-center text-slate-500 dark:text-white">
            Go back to{" "}
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
export default ConfirmPassword;