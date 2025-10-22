import axios from "axios";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

// 🧠 Mock Data
async function getColleges(career: string, city: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/colleges?career=${career}&city=${city}`
    );
    return res.data;
  } catch {
    return {
      success: true,
      data: [
        {
          name: "MIT College of Engineering",
          city: "Pune",
          rating: 4.6,
          fees: "₹1.2L / year",
          highlights: [
            "Top recruiters: Infosys, Google, TCS",
            "NAAC 'A+' Accredited",
            "AI & ML Research Center",
          ],
        },
        {
          name: "VIT Vellore",
          city: "Vellore",
          rating: 4.8,
          fees: "₹1.6L / year",
          highlights: [
            "Ranked #8 by NIRF 2024",
            "24x7 Labs and Innovation Hub",
            "Best placements for CSE",
          ],
        },
        {
          name: "College of Engineering, Pune (COEP)",
          city: "Pune",
          rating: 4.7,
          fees: "₹1.1L / year",
          highlights: [
            "Government Autonomous Institute",
            "Strong Alumni Network",
            "Focus on AI and Robotics",
          ],
        },
      ],
    };
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { career: string };
  searchParams: { city?: string };
}) {
  const city = searchParams.city || "India";
  return {
    title: `Top Colleges for ${params.career.toUpperCase()} in ${city} | Udaan`,
    description: `Explore the best ${params.career} colleges in ${city}, with details on fees, placements, and facilities.`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { career: string };
  searchParams: { city?: string };
}) {
  const city = searchParams.city || "Pune";
  const data = await getColleges(params.career, city);
  if (!data?.success) notFound();

  const cities = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Bhopal",
    "Indore",
    "Nagpur",
    "Aurangabad",
    "Nashik",
    "Surat",
    "Goa",
  ];

  const colleges = data.data;

  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading...</div>}>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800">
        {/* HEADER */}
        <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-10 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">
                🎓 Top {params.career.toUpperCase()} Colleges in {city}
              </h1>
              <p className="text-blue-100 mt-2">
                Explore the best colleges offering {params.career} programs with top placements and modern infrastructure.
              </p>
            </div>

            {/* ✅ SSR-SAFE SELECTOR */}
            <form
              action={`/clg/${params.career}`}
              method="get"
              className="bg-white text-gray-800 rounded-full shadow-md px-4 py-2 flex items-center gap-3"
            >
              <label htmlFor="city" className="font-medium text-sm">
                📍 Select City:
              </label>
              <select
                id="city"
                name="city"
                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
                defaultValue={city}
              >
                {cities.map((c) => (
                  <option key={c} value={c.toLowerCase()}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Submit button – triggers SSR refresh */}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-all"
              >
                Go
              </button>
            </form>
          </div>
        </header>

        {/* BODY */}
        <div className="max-w-6xl mx-auto px-6 py-14 space-y-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college: any, i: number) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 w-full" />
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition">
                      {college.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">{college.city}</p>
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="font-semibold text-gray-700">
                        {college.rating}/5
                      </span>
                    </div>
                    {/* Highlights */}
                    <ul className="space-y-2 text-sm text-gray-600">
                      {college.highlights.map((h: string, j: number) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Fees + CTA */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-emerald-600 font-semibold text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      {college.fees}
                    </span>
                    <Link
                      href={`/college/${college.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-indigo-600 font-semibold text-sm hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="text-center mt-8 mb-12">
          <Link
            href={`/career/${params.career}`}
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            ← Back to Career Overview
          </Link>
        </div>
      </main>
    </Suspense>
  );
}
