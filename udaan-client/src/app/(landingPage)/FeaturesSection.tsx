import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Recommendations",
      desc: "Get college & course suggestions aligned with your strengths and goals.",
      route: "/career",
    },
    {
      title: "Internship Match",
      desc: "Find internships tailored to your domain and skill level.",
    },
    {
      title: "Scholarship Finder",
      desc: "Access scholarships that fit your profile — easily & instantly.",
    },
    {
      title: "Mentorship & Counseling",
      desc: "Connect with experienced mentors & alumni for career clarity.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white/70 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Why <span className="text-indigo-600">Students</span> Love Udaan
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const content = (
              <Card
                key={i}
                className="group bg-white/80 backdrop-blur-sm border border-indigo-50 hover:border-indigo-200 hover:shadow-lg rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-indigo-700 group-hover:text-indigo-800 transition-colors duration-300">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            );

            return f.route ? (
              <Link key={i} href={f.route} className="no-underline">
                {content}
              </Link>
            ) : (
              content
            );
          })}
        </div>
      </div>
    </section>
  );
}
