import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../apis/api";
import { Icons } from "../../../constants";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setTimeout(() => navigate("/publish"));
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post(
        "/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        setSuccess("Login successful!");
        const { token, data } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", data._id);
        const decodedToken = jwtDecode(token);
        window.dispatchEvent(new CustomEvent("user-login", { detail: decodedToken.user }));
        navigate("/publish");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://schedulx-backend-gj3k.onrender.com/api/v1/auth/google"; 
    // window.location.href = "http://localhost:5000/api/v1/auth/google";
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="antialiased grid place-items-center min-h-screen px-4 sm:px-0">
      <div className="w-full max-w-md sm:max-w-lg mx-auto bg-white p-8 sm:p-10 rounded-xl shadow shadow-slate-300 dark:text-white dark:bg-bgCopnents">
        <h1 className="text-3xl sm:text-4xl font-bold flex items-center">Login to <span className="ms-3 flex  text-3xl sm:text-4xl items-center dark:text-white">
          Schedul
          <span className="text-red-600">{Icons.schedulXAuth}</span>
        </span></h1>
        <p className="text-slate-500 mt-2 dark:text-white">Hi, Welcome back 👋</p>
        <div className="my-5">
          <button
            type="button"
            className="w-full py-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:shadow transition duration-150 dark:border-borderDarkmode dark:bg-bgbutton dark:text-white hover:dark:bg-white hover:dark:text-black"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-6 h-6"
              alt="Google Icon"
              loading="lazy"
            />
            <span>Login with Google</span>
          </button>
        </div>
        <div className="relative">
          <div className="relative flex items-center py-1">
            <div className="grow border-t border-zinc-200 dark:border-borderDarkmode"></div>
          </div>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2 dark:text-white">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode dark:border-borderDarkmode"
                placeholder="Enter email address"
                required
              />
            </label>
            <label htmlFor="password" className="block">
              <p className="font-medium text-slate-700 pb-2 dark:text-white">Password*</p>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 border-slate-200 checked:bg-black"
                />
                <span className="ml-2 text-slate-700 dark:text-white">Remember me</span>
              </label>
              <Link
                to={"/forget-password"}
                className="font-medium text-indigo-600 mt-2 sm:mt-0"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-gray-950 hover:bg-gray-900 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </button>
            <p className="text-center">
              Not registered yet?{" "}
              <Link
                to={"/registration"}
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Register now</span>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
