"use client";
import { doSignIn, login } from "@/app/actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaFacebookF, FaSpinner } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  async function onHanldeSubmit(data) {
    setLoading(true);
    try {
      const response = await login(data);
      if (!!response.error) {
        setError(response.error);
      } else {
        if (searchParams.get("back")) {
          router.back();
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onHanldeSubmit({ email, password });
    }
  };

  const handleSocialSignIn = (type) => {
    doSignIn(type);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4 lg:w-1/2">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover min-h-[450px]"
          style={{ backgroundImage: `url('/login.png')` }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          {error && (
            <div className="text-xl text-red-500 text-center">{error}</div>
          )}
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Login
          </h2>
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full flex gap-4 items-center justify-center disabled:bg-opacity-60 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded hover:bg-gradient-to-l duration-500"
              >
               <MdLogin /> {loading && <FaSpinner />}  Login
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center bg-gray-100 mt-4">
            <div className="w-full  bg-white rounded ">
              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => handleSocialSignIn("google")}
                  className="flex items-center justify-center w-full px-2 py-2 space-x-2 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 duration-500"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M44.5 24.5C44.5 23.6667 44.4333 22.8 44.3333 22H24V26.5H35.1667C34.4833 29.1667 32.6167 31.2667 30.2 32.2167V36.1833H36.7333C40.3833 33.0833 42.5 28.3333 42.5 23C42.5 22.5 42.5 22 42.4833 21.5H44.5V24.5Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 44C29.5 44 34.1667 42.0333 36.7333 38.7833L30.2 34.8167C28.5667 35.8167 26.5167 36.5 24 36.5C19.6 36.5 15.9333 33.6 14.5 29.3333H7.8V33.4167C10.5667 39.0167 16.6667 44 24 44Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5 29.3333C13.8333 27.8333 13.5 26.1667 13.5 24.5C13.5 22.8333 13.8333 21.1667 14.5 19.6667V15.6667H7.8C5.66667 20.1667 5.66667 27.8333 7.8 32.3333L14.5 29.3333Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 13.5C26.6333 13.5 28.9333 14.4667 30.7 16.1L36.8 10C33.1667 6.83333 28.2 5 24 5C16.6667 5 10.5667 9.98333 7.8 15.6667L14.5 19.6667C15.9333 15.4 19.6 12.5 24 12.5C24.1667 12.5 24.3333 12.5 24.5 12.5V13.5Z"
                      fill="white"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                <button
                  onClick={() => handleSocialSignIn("facebook")}
                  className="flex items-center justify-center w-full px-2 py-2 gap-2  text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 duration-500"
                >
                  <FaFacebookF size={"16px"} />
                  <span>Sign in with Facebook</span>
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {" "}
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
