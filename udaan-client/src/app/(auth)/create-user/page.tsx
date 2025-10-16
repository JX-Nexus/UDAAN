"use client";
import { useState } from "react";
import { createUserSchema, type CreateUserSchema } from "@/schemas/create-user.schema";
import { toast } from "sonner"
import authService from "@/services/auth.service";
import { useRouter } from 'next/navigation'

export default function Page() {
const [formData, setFormData] = useState<CreateUserSchema>({
  name: "",
  username: "",
  email: "",
  password: "",
  age: "",
});
 const router = useRouter()
  function getPasswordStrength(password: string) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@$!%*?&#^]/.test(password)) strength++;

  if (strength <= 1) return { level: "Weak", color: "bg-red-500" };
  if (strength === 2) return { level: "Medium", color: "bg-yellow-500" };
  if (strength >= 3) return { level: "Strong", color: "bg-green-500" };
  return { level: "Weak", color: "bg-red-500" };
}
  const [errors, setErrors] = useState<Partial<Record<keyof CreateUserSchema, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const result = createUserSchema.safeParse(formData);

  if (result.success) {
    setErrors({});

    try {
      const data = await authService.createAccount(formData);

      // ✅ Handle if API didn't return data
      if (!data || !data.success) {
       
     toast("Registration Failed ❌", {
        description: data?.message || "Something went wrong. Please try again.",
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

      // ✅ Success toast
      toast("Account Created 🎉", {
        description: data.message || "Welcome to Udaan!",
        action: {
          label: "Login",
         onClick: () => router.push('/sign-in'),
        },
      });
    } catch (err: any) {
      console.error("❌ API Error:", err?.response?.data || err);

      const message =
        err?.response?.data?.message || // ✅ use .message not .error (backend consistency)
        err?.response?.data?.error || // fallback if backend uses 'error'
        err?.message ||
        "Unable to connect to the server. Please try again later.";

        toast.error("Registration Failed", {
        description: message,
        style: {
          "--normal-bg":
            "light-dark(hsl(var(--destructive)), color-mix(in oklab, hsl(var(--destructive)) 60%, hsl(var(--background))))",
          "--normal-text": "hsl(var(--destructive-foreground))",
          "--normal-border": "transparent",
        } as React.CSSProperties,
      });

    }
  } else {
    // ❌ Validation failed — safely handle each field error
    const fieldErrors: Partial<Record<keyof CreateUserSchema, string>> = {};

    result.error?.issues?.forEach((issue) => {
      const field = issue.path?.[0] as keyof CreateUserSchema;
      if (field) fieldErrors[field] = issue.message;
    });

    setErrors(fieldErrors);
  }
};



  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 flex items-center justify-center p-6 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-300/40 rounded-full blur-3xl top-0 left-10 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-sky-400/30 rounded-full blur-3xl bottom-0 right-10 animate-pulse" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-10 transition-all duration-300 hover:shadow-indigo-200/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Image
              src="/logo.svg"
              alt="Udaan Logo"
              width={45}
              height={45}
              className="object-contain"
            />
            <h1 className="text-4xl font-bold text-slate-800">
              <span className="text-indigo-600">U</span>daan
            </h1>
          </div>
          <p className="text-slate-500 text-sm">
            Create your account and begin your journey 🚀
          </p>
        </div>

        {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Username */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField
            label="Full Name"
            id="name"
            placeholder="Jayesh Kathale"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            />
            <InputField
            label="Username"
            id="username"
            placeholder="gaminggod12"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            />
        </div>

        {/* Email + Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="JayeshKathale@gmail.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            />
            <InputField
            label="Age"
            id="age"
            type="number"
            placeholder="16"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
            />
        </div>

        {/* Password Field with Strength Indicator */}
        <div>
            <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1"
            >
            Password
            </label>
            <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            className={`w-full px-4 py-2.5 border rounded-lg outline-none transition text-[15px] ${
                errors.password
                ? "border-red-400 focus:ring-red-300"
                : "border-slate-300 focus:ring-2 focus:ring-indigo-400"
            }`}
            />
            {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}

            {/* Password Strength Meter */}
            {formData.password && (
            <div className="mt-3 space-y-1">
                <div className="flex gap-2">
                {[1, 2, 3].map((bar) => {
                    const strength = getPasswordStrength(formData.password);
                    const activeLevel =
                    (strength.level === "Weak" && bar === 1) ||
                    (strength.level === "Medium" && bar <= 2) ||
                    (strength.level === "Strong" && bar <= 3);
                    return (
                    <div
                        key={bar}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        activeLevel ? strength.color : "bg-slate-200"
                        }`}
                    ></div>
                    );
                })}
                </div>
                <p
                className={`text-xs font-medium ${
                    getPasswordStrength(formData.password).level === "Weak"
                    ? "text-red-500"
                    : getPasswordStrength(formData.password).level === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
                >
                Strength: {getPasswordStrength(formData.password).level}
                </p>
            </div>
            )}
        </div>

        {/* Future Fields Section */}
        <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-2">
            ⚙️ Additional fields coming soon
            </p>
            <div className="flex gap-3">
            <div className="flex-1 bg-slate-100 h-10 rounded-lg animate-pulse"></div>
            <div className="flex-1 bg-slate-100 h-10 rounded-lg animate-pulse"></div>
            </div>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition mt-3"
        >
            Create Account
        </button>
        </form>


        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="px-3 text-slate-400 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        {/* Social Login */}
        <div className="flex flex-row gap-3">
          <button className="flex items-center justify-center gap-3 w-full border border-slate-300 rounded-lg py-2.5 hover:bg-slate-50 transition">
            <Image
              src="/google-icon-logo-svgrepo-com.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            <span className="text-slate-700 text-sm font-medium">
              Sign up with Google
            </span>
          </button>
          <button className="flex items-center justify-center gap-3 w-full border border-slate-300 rounded-lg py-2.5 hover:bg-slate-50 transition">
            <Image
              src="/github-mark-white.svg"
              alt="GitHub Logo"
              width={20}
              height={20}
              className="bg-slate-800 rounded-full p-1"
            />
            <span className="text-slate-700 text-sm font-medium">
              Sign up with GitHub
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Sign In
          </a>
        </p>

        <p className="text-center mt-4 text-[13px] text-slate-400">
          Built by <span className="font-semibold text-indigo-600">JX Nexus</span>
        </p>
      </div>
    </div>
  );
}

/* Reusable Input Field */
function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 border rounded-lg outline-none transition text-[15px]
          ${error ? "border-red-400 focus:ring-red-300" : "border-slate-300 focus:ring-2 focus:ring-indigo-400"}
        `}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
