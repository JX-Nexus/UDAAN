"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInSchema, type  SignInSchema } from "@/schemas/sign-in.schema";
import authService from "@/services/auth.service";
import { useAppDispatch, useAppSelector  } from "@/lib/hooks";
import { login } from "@/lib/slice/auth/authSlice";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<SignInSchema>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignInSchema, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignInSchema, string>> = {};
      result.error?.issues?.forEach((issue) => {
        const field = issue.path?.[0] as keyof SignInSchema;
        if (field) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      const data = await authService.signIn(formData);

      if (!data || !data.success) {
        toast("Login Failed ❌", {
          description: data?.message || "Invalid credentials, please try again.",
          duration: 5000,
          classNames: {
            toast:
              "bg-red-100 border border-red-500 text-red-800 dark:bg-red-950 dark:text-red-200 dark:border-red-700",
            description:
              "text-red-700 dark:text-red-300 text-sm font-medium tracking-wide",
            actionButton:
              "bg-red-600 text-white hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700",
          },
        });
        return;
      }
      dispatch(login({ userData: data.data }));
      toast("Welcome Back 👋", {
        description: data.message || "Signed in successfully!",
        action: {
          label: "Success",
          onClick: () => router.push("/dashboard"),
        },
      });
       setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
    } catch (err: any) {
      console.error("❌ API Error:", err?.response?.data || err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Unable to connect to the server. Please try again later.";

      toast.error("Login Failed", {
        description: message,
        style: {
          "--normal-bg":
            "light-dark(hsl(var(--destructive)), color-mix(in oklab, hsl(var(--destructive)) 60%, hsl(var(--background))))",
          "--normal-text": "hsl(var(--destructive-foreground))",
          "--normal-border": "transparent",
        } as React.CSSProperties,
      });
    }
  };

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

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
            type="submit"
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
        <div>
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
    </div>
  );
}
