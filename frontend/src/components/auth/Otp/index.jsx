import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../apis/api"; 

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    try {
      const response = await api.post("/api/v1/auth/password-reset-otp-check", { otp: otpCode });

      if (response.data.message) {
        localStorage.setItem("verifiedOtp", otpCode);

        navigate("/confirm-password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="antialiased grid place-items-center h-screen">
      <div className="w-1/4 mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 dark:bg-bgCopnents">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold dark:text-white">Verify OTP</h1>
          <p className="text-slate-500 mt-2 dark:text-white">
            Enter the 6-digit code sent to your email or phone number.
          </p>
        </div>
        {/* OTP Form */}
        <form onSubmit={handleOtpSubmit} className="space-y-5">
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                className="w-12 h-12 text-center text-lg border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow dark:bg-ScocilMCompnent"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-gray-950 hover:bg-gray-900 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <span className="dark:text-white">Verify OTP</span>
          </button>
          {/* Resend OTP Link */}
          <p className="text-center text-slate-500 dark:text-white">
            Didn't receive the code?{" "}
            <Link
              to="/resend-otp"
              className="text-indigo-600 font-medium hover:underline"
            >
              Resend OTP
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default OtpPage;