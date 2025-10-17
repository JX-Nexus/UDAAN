"use client"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import authService from "@/services/auth.service";

interface ProtectedRouteProps {
  children: React.ReactNode;
  authentication?: boolean; // true = protected page, false = guest-only page
}

export default async function ProtectedRoute({
  children,
  authentication = true,
}: ProtectedRouteProps) {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString(); // serialize cookies for header

  let user: any = null;

  try {
    // Send backend request with cookies manually forwarded
    const res = await authService.getCurrentUser(cookieHeader);
    console.log(res)
    if (res.data?.success) {
      user = res.data.data;
    }
  } catch (err: any) {
    console.error("Auth check failed:", err.response?.data || err.message);
  }

  // 🔒 redirect logic
  if (authentication && !user) {
    redirect("/sign-in");
  } else if (!authentication && user) {
    redirect("/dashboard");
  }

  // ✅ authorized
  return <>{children}</>;
}
