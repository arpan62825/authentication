import { Check } from "lucide-react";
import { Link, useNavigate } from "react-router";

import axiosInstance from "../lib/axios.js";

const SignupPage = () => {
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { password } = data;

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    try {
      console.log(typeof data);
      console.log(data);
      await axiosInstance.post("/auth/signup", data);

      navigate("/verification");
    } catch (error) {
      console.log(
        `An error occurred while trying to send request to '/api/auth/signup': ${error}`,
      );
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Join us today and get started in just a few minutes.
          </p>
        </div>
        <form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={64}
              placeholder="Enter your full name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <span className="text-xs text-slate-500">8+ characters</span>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              minLength={8}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Must include at least one uppercase letter and one number.
            </p>
          </div>

          <div className="mt-2 flex gap-3 justify-center">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl w-full bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              <Check size={18} />
              Create Account
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
