import { Link } from "react-router";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-700/50 bg-slate-900/70 p-10 text-center shadow-2xl backdrop-blur-md">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Welcome to <span className="text-blue-500">Our App</span>
          </h1>

          <p className="mt-4 text-lg text-slate-300">
            Create an account to get started or sign in to continue where you
            left off.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800 px-6 py-3 font-medium text-slate-200 transition-all duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
