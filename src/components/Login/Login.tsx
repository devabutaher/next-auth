"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";

interface FormType {
  email: string;
  password: string;
}

const Login = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("redirectURL");
  const { replace } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>();

  const handleAuth = async (data: FormType) => {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      if (from) {
        replace(`${from}`);
      }
    }
  };

  return (
    <div className="container flex items-center justify-center py-20 px-6 mx-auto">
      <form onSubmit={handleSubmit(handleAuth)} className="w-full max-w-md">
        <div className="flex justify-center mx-auto">
          <h1 className="font-semibold text-4xl text-center text-gray-200">
            Login
          </h1>
        </div>

        <div className="flex items-center justify-center mt-6">
          <Link
            href="/login"
            className="w-1/3 pb-4 font-medium text-center text-gray-600 capitalize border-b-2 border-orange-600"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="w-1/3 pb-4 font-medium text-center text-gray-600 capitalize border-b-2 border-gray-900"
          >
            Sign Up
          </Link>
        </div>

        <div className="relative flex items-center mt-6">
          <span className="absolute px-2 text-gray-800">
            <AiOutlineMail size={"1.5rem"} />
          </span>

          <input
            {...register("email", {
              required: "*email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            type="email"
            className="input-style"
            placeholder="Email address"
          />
        </div>
        {errors.email && (
          <span className="text-orange-600">{errors.email.message}</span>
        )}

        <div className="relative flex items-center mt-4">
          <span className="absolute px-2 text-gray-800">
            <AiOutlineLock size={"1.5rem"} />
          </span>

          <input
            {...register("password", {
              required: "*password is required",
              minLength: {
                value: 6,
                message: "password must be 6 characters",
              },
            })}
            type="password"
            className="input-style"
            placeholder="Password"
          />
        </div>
        {errors.password && (
          <span className="text-orange-600">{errors.password.message}</span>
        )}

        <div className="mt-4">
          <button className="button" type="submit">
            Sign In
          </button>

          <p className="mt-4 text-center text-gray-600">or sign in with</p>

          <button
            type="button"
            className="flex items-center justify-center w-full px-6 py-3 mt-4 text-gray-200 border-gray-900 transition-colors duration-300 transform border rounded-lg hover:bg-gray-900"
          >
            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>

            <span className="mx-2">Sign in with Google</span>
          </button>

          <div className="mt-6 text-center ">
            <Link
              href="/register"
              className="text-sm text-orange-600 hover:underline"
            >
              Create an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
