import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../apis/api";
import { Icons } from "../../../constants/icons";
import { Link } from "react-router-dom";

const Registration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    weekStart: "Monday",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role: role === formData.role ? "" : role,
    }));
  };
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",];
  const handleNext = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setStep(2); // Go to Step 2
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      setError("Please select a role.");
      return;
    }
    setError("");
    try {
      const response = await api.post("/api/v1/user/user-add", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        weekStart: formData.weekStart,
      });
      if (response.data.success) {
        setSuccess("Registration successful!");
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            weekStart: "Monday",
            role: "",
          });
          setStep(1);
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Error registering user. Please try again later."
      );
    }
  };
  const roles = [
    { id: "SmallBusinessOwners", label: "Small Business Owner" },
    { id: "Solopreneurs", label: "Solopreneur" },
    { id: "ContentCreators", label: "Content Creator" },
    { id: "SocialMediaManagers", label: "Social Media Manager" },
    { id: "MarketingProfessionals", label: "Marketing Professional" },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="antialiased grid place-items-center min-h-screen px-4 sm:px-0">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 dark:text-white dark:bg-bgCopnents">
        {step === 1 && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
              Let's set up your
              <span className=" flex items-center dark:text-white">
                Schedul
                <span className="text-red-600">{Icons.schedulXAuth}</span>
              </span>
              account
            </h1>
            <p className="text-slate-500 mt-3 dark:text-white">
              "Take control of your social media planning like never before." 👋
            </p>

            <form className="mt-7 flex flex-col space-y-3">
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <label htmlFor="name">
                <p className="font-medium text-slate-700 pb-2 dark:text-white">
                  Full Name*
                </p>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
                  placeholder="Enter your full name"
                  required
                />
              </label>
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2 dark:text-white">
                  Email*
                </p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
                  placeholder="Enter your email"
                  required
                />
              </label>
              <label htmlFor="phoneNumber">
                <p className="font-medium text-slate-700 pb-2 dark:text-white">
                  Phone Number*
                </p>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
                  placeholder="Enter your phone number"
                  required
                />
              </label>
              <label htmlFor="password" className="block">
                <p className="font-medium text-slate-700 pb-2 dark:text-white">
                  Password*
                </p>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-4 focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
              <label htmlFor="confirmPassword" className="block">
                <p className="font-medium text-slate-700 pb-2 dark:text-white">
                  Confirm Password*
                </p>
                <div className="relative flex items-center">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-4 focus:outline-none"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              <div className="flex justify-end">
                <div
                  onClick={handleNext}
                  className={`group cursor-pointer flex items-center justify-center py-3 px-6 border rounded-lg transition-all hover:shadow-md ${"border-gray-300 bg-gray-200 hover:border-gray-400"} dark:bg-bgbutton hover:dark:bg-white`}
                >
                  <span className="text-sm font-medium text-slate-700 flex items-center dark:text-white group-hover:text-black">
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to={"/login"}
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
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold ">
              Let’s Customize Your Experience
            </h1>
            <p className="text-slate-500 mt-3 dark:text-white">
              "Tell us a little more about how you’ll use SchedulX to help us
              personalize your journey."
            </p>

            <form
              className="mt-7 flex flex-col space-y-7"
              onSubmit={handleSubmit}
            >
              <label htmlFor="weekStart">
                <p className="font-medium text-slate-700 pb-2 dark:text-white">
                  Select Your Week Start Day
                </p>
                <select
                  id="weekStart"
                  name="weekStart"
                  value={formData.weekStart}
                  onChange={handleChange}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-dropdown"
                >
                  <option value="" disabled selected>
                    Pick the day to kick off your social media calendar.
                  </option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <p className="font-medium text-slate-700 pb-2 dark:text-white">
                  Role
                </p>
                <p className="text-slate-600 text-sm pb-4 dark:text-white">
                  Please select the role that best aligns with your profile to
                  help us tailor your social media management experience.
                </p>
                <p className="text-sm pb-4 text-red-900 font-bold">{error}</p>
                <div className="flex flex-wrap gap-4">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      className={`group cursor-pointer flex items-center justify-center py-3 px-6 border rounded-lg transition-all hover:shadow-md ${formData.role === role.id
                        ? "border-black bg-gray-100 dark:bg-gray-800"
                        : "border-gray-300 dark:border-gray-600"
                        } hover:border-black hover:bg-gray-200 dark:hover:bg-gray-700 border-borderDarkmode`}
                    >
                      <span className="text-sm font-medium text-slate-700 flex items-center dark:text-white group-hover:text-black dark:group-hover:text-white">
                        {role.label}
                        {formData.role === role.id && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-black ml-2 dark:text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between gap-4 mt-6">
                <div
                  onClick={() => setStep(1)}
                  className="group py-3 px-3 font-medium text-white bg-gray-950 hover:bg-gray-900 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center dark:bg-bgbutton dark:text-white hover:dark:bg-white hover:dark:text-black">
                  <span className="text-sm font-medium text-white flex items-center group-hover:text-black dark:group-hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </span>
                </div>
                <div
                  onClick={handleSubmit}
                  className="group cursor-pointer flex items-center justify-center py-3 px-6 border rounded-lg transition-all hover:shadow-lg border-black bg-black hover:bg-gray-900 dark:border-borderDarkmode dark:bg-bgbutton dark:hover:bg-white"
                >
                  <span className="text-sm font-medium text-white flex items-center group-hover:text-gray-300 dark:group-hover:text-black">
                    Create Account
                  </span>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;
