import axios from "axios";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function getCareerDetails(slug: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/career/details/${slug}`,
      { withCredentials: true }
    );
    return res.data;
  } catch {
    console.warn("⚠️ Mock fallback for:", slug);

    return {
      success: true,
      data: {
        icon: "💻",
        title: "B.Tech in Computer Science & AI",
        type: "Course",
        confidence: 92,
        description:
          "A program blending core Computer Science with Artificial Intelligence and Data-Driven innovation — perfect for problem solvers and creators.",
        whatYouLearn: [
          "Programming (Python, Java, C++)",
          "Machine Learning & Deep Learning Fundamentals",
          "System Design, Databases, and Cloud Computing",
          "AI Ethics, Robotics, and Automation"
        ],
        whatYouDo: [
          "Build intelligent systems that learn from data.",
          "Develop scalable software and cloud services.",
          "Research next-gen AI technologies and deploy real-world solutions."
        ],
        industries: [
          "Technology",
          "Healthcare",
          "Finance",
          "Education",
          "Cybersecurity"
        ],
        futureScope:
          "AI and automation are reshaping every industry — demand for computer scientists with AI expertise will grow exponentially through 2030.",
        salaryRange: "₹6 L – ₹30 L per year (India average, varies by role)",
        jobs: [
          { title: "AI Engineer" },
          { title: "Data Scientist" },
          { title: "Software Developer" },
          { title: "Cloud Architect" },
          { title: "Research Scientist" }
        ],
        reasons:
          "You have a strong analytical and logical mind.||You’re curious about how machines think and learn.||You enjoy solving complex problems through innovation."
      }
    };
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getCareerDetails(params.slug);
  if (!data?.success) return {};

  return {
    title: `${data.data.title} — Career Insights | Udaan`,
    description: `Explore why ${data.data.title} suits your skills, what you’ll learn, and where this field is headed.`
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getCareerDetails(params.slug);
  if (!data?.success) notFound();

  const c = data.data;
  const reasons = c.reasons?.split("||") || [];

  const collegeLink = `/clg/${params.slug}?city=aurangabad`;

  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading...</div>}>
      <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800">
        {/* Fixed Floating Button */}
        <Link
          href={collegeLink}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          🎓 Find Colleges for {c.title.split(" ")[0]}
        </Link>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-95" />
          <div className="relative max-w-6xl mx-auto py-20 px-6 text-center text-white">
            <div className="text-6xl mb-4 drop-shadow-lg">{c.icon || "💼"}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
              {c.title}
            </h1>
            <p className="max-w-2xl mx-auto text-blue-100 text-sm md:text-base leading-relaxed">
              {c.description}
            </p>

            {/* Confidence Bar */}
            {c.confidence && (
              <div className="mt-6">
                <p className="font-semibold text-blue-50 mb-2">
                  Confidence Match: {c.confidence}%
                </p>
                <div className="w-72 mx-auto h-3 bg-blue-300/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-300 to-emerald-500 rounded-full"
                    style={{ width: `${c.confidence}%` }}
                  />
                </div>
              </div>
            )}

           
          </div>
        </section>

        {/* Main Body */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          {/* What You’ll Learn */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              📘 What You’ll Learn
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {c.whatYouLearn?.map((item: string, i: number) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What You’ll Be Doing */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              🧠 What You’ll Be Doing
            </h2>
            <ul className="space-y-4">
              {c.whatYouDo?.map((d: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-left hover:bg-indigo-100 transition"
                >
                  <span className="text-indigo-600 font-bold text-lg">•</span>
                  <p className="text-gray-700 leading-relaxed">{d}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Industries */}
          {c.industries && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                🌐 Key Industries
              </h2>
              <div className="flex flex-wrap gap-3">
                {c.industries.map((ind: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-100 hover:bg-blue-100 transition"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Future Scope */}
          {c.futureScope && (
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                🚀 Future Scope
              </h2>
              <p className="text-gray-700 leading-relaxed bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {c.futureScope}
              </p>
            </section>
          )}

          {/* Salary */}
          {c.salaryRange && (
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                💰 Salary Outlook
              </h2>
              <p className="text-lg font-semibold text-emerald-700 bg-emerald-50 inline-block px-4 py-2 rounded-xl border border-emerald-100">
                {c.salaryRange}
              </p>
            </section>
          )}

          {/* Why This Career Fits You */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              🎯 Why This Career Fits You
            </h2>
            <ul className="space-y-3">
              {reasons.map((r: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 text-left hover:bg-green-100 transition"
                >
                  <span className="text-green-600 font-bold text-lg">•</span>
                  <p className="text-gray-700 leading-relaxed">{r.trim()}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Jobs */}
          {c.jobs && (
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                💼 Popular Job Roles
              </h2>
              <div className="flex flex-wrap gap-3">
                {c.jobs.map((j: { title: string }, i: number) => (
                  <span
                    key={i}
                    className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-100 hover:bg-indigo-100 transition"
                  >
                    {j.title}
                  </span>
                ))}
              </div>
            </section>
          )}

         
        </div>
      </main>
    </Suspense>
  );
}
