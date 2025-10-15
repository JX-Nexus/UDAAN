"use client";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Floating Background Aesthetic */}
      <div className="absolute w-72 h-72 bg-indigo-300/40 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-sky-400/30 rounded-full blur-3xl bottom-20 right-10 animate-pulse" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Image
              src="/logo.svg"
              alt="Udaan Logo"
              width={42}
              height={42}
              className="object-contain"
            />
            <h1 className="text-3xl font-bold text-slate-800">
              <span className="text-indigo-600">U</span>daan
            </h1>
          </div>
          <p className="text-slate-500 text-sm">
            Welcome back! Let’s continue your journey 🚀
          </p>
        </div>

        {/* Form (visual only) */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-indigo-600 w-4 h-4 rounded"
              />
              <span className="text-slate-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="button"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="px-3 text-slate-400 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 w-full border border-slate-300 rounded-lg py-2.5 hover:bg-slate-50 transition">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            <span className="text-slate-700 text-sm font-medium">
              Continue with Google
            </span>
          </button>
          <button className="flex items-center justify-center gap-3 w-full border border-slate-300 rounded-lg py-2.5 hover:bg-slate-50 transition">
            <Image
              src="/github-mark.svg"
              alt="GitHub Logo"
              width={20}
              height={20}
            />
            <span className="text-slate-700 text-sm font-medium">
              Continue with GitHub
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link
            href="/create-user"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Create one
          </Link>
        </p>

        <p className="text-center mt-4 text-[13px] text-slate-400">
          Built by <span className="font-semibold text-indigo-600">JX Nexus</span>
        </p>
      </div>
    </div>
  );
}
