import React, { useState } from "react";
import axios from "axios";
import api from "../../../apis/api";
import { useNavigate } from "react-router";

const Account = () => {
  const [passwordData, setPasswordData] = useState({
    currantPassword: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.post(
        "/api/v1/auth/password-reset-currant",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage({ type: "success", text: response.data.message });
      setPasswordData({ currantPassword: "", password: "", confirmPassword: "" });
      navigate('/publish')
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[512px] space-y-6">
        {/* Password Reset Section */}
        <div className="bg-white border border-[rgb(184,184,184)] rounded-xl py-8 px-6 shadow dark:bg-bgCopnents dark:border-borderDarkmode">
          <label className="block text-gray-700 font-bold text-2xl mb-2 text-center dark:text-white">Change Password</label>

          {message && (
            <div
              className={`mb-4 p-4 rounded text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-base mb-1 dark:text-white">Current Password</label>
              <input
                type="password"
                name="currantPassword"
                value={passwordData.currantPassword}
                onChange={handlePasswordChange}
                required
                className="w-full border border-[rgb(184,184,184)] rounded-xl px-2 py-3 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:bg-ScocilMCompnent"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-1 dark:text-white">New Password</label>
              <input
                type="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
                required
                className="w-full border border-[rgb(184,184,184)] rounded-xl px-2 py-3 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:bg-ScocilMCompnent"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-1 dark:text-white">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="w-full border border-[rgb(184,184,184)] rounded-xl px-2 py-3 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:bg-ScocilMCompnent"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 px-4 rounded-xl text-white font-medium dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-slate-500 hover:bg-slate-600"
              } focus:ring-2 focus:ring-offset-2 focus:ring-slate-500`}
              disabled={loading}
            >
              {loading ? "Changing Password..." : "Update Password"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Account;
