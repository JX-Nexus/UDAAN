import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";

export default function Navbar() {
    const user = useAppSelector((state) => state.auth.userData);

    return (
        <nav className="w-full bg-white/80 backdrop-blur-xl shadow-md border-b border-white/40 py-3 px-6 flex justify-between items-center fixed top-0 left-0 z-50">
            <h1 className="text-xl font-bold text-slate-800">
                <span className="text-indigo-600">U</span>daan
            </h1>

            <div className="flex items-center gap-6 text-slate-700 font-medium">
                <Link href="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
                <Link href="/quiz" className="hover:text-indigo-600 transition">Quiz</Link>
                <Link href="/colleges" className="hover:text-indigo-600 transition">Colleges</Link>
                <Link href="/scholarships" className="hover:text-indigo-600 transition">Scholarships</Link>
                <Link href="/internships" className="hover:text-indigo-600 transition">Internships</Link>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50 border border-white/60 px-4 py-2 rounded-xl shadow-sm">
                <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
                    {user?.name?.slice(0, 2).toUpperCase() || "US"}
                </div>
                <span className="text-slate-700 font-medium max-w-[120px] truncate">{user?.name || "User"}</span>
            </div>
        </nav>
    );
}
