"use client";
import Head from "next/head";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import Navbar from "../navbar";

export default function Dashboard() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100 p-6">
     
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Take Quiz */}
        <Link
          href="/quiz"
          className="bg-white/80 backdrop-blur-xl shadow-xl border border-white/40 p-6 rounded-2xl hover:shadow-2xl transition group hover:-translate-y-1"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="p-4 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl">
              <span role="img" aria-label="quiz">
                📊
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600">
              Take a Career Quiz
            </h2>
            <p className="text-slate-600 text-sm">
              Answer a few questions to discover careers that match your strengths and interests.
            </p>
          </div>
        </Link>

        {/* Explore Colleges */}
        <Link
          href="/colleges"
          className="bg-white/80 backdrop-blur-xl shadow-xl border border-white/40 p-6 rounded-2xl hover:shadow-2xl transition group hover:-translate-y-1"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="p-4 rounded-xl bg-sky-100 flex items-center justify-center text-2xl">
              <span role="img" aria-label="college">
                🎓
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-600">
              Explore Colleges
            </h2>
            <p className="text-slate-600 text-sm">
              Browse colleges, compare programs, and find the right campus for your journey.
            </p>
          </div>
        </Link>

        {/* Scholarships */}
        <Link
          href="/scholarships"
          className="bg-white/80 backdrop-blur-xl shadow-xl border border-white/40 p-6 rounded-2xl hover:shadow-2xl transition group hover:-translate-y-1"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="p-4 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">
              <span role="img" aria-label="scholarship">
                💰
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-amber-600">
              Scholarships
            </h2>
            <p className="text-slate-600 text-sm">
              Discover scholarships and financial aid opportunities tailored to you.
            </p>
          </div>
        </Link>

        {/* Internships */}
        <Link
          href="/internships"
          className="bg-white/80 backdrop-blur-xl shadow-xl border border-white/40 p-6 rounded-2xl hover:shadow-2xl transition group hover:-translate-y-1"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="p-4 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
              <span role="img" aria-label="internship">
                💼
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-green-600">
              Internship Opportunities
            </h2>
            <p className="text-slate-600 text-sm">
              Explore internships that give you hands-on experience in real-world projects.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}