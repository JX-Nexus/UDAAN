import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesSection() {
  const features = [
    { title: "Smart Recommendations", desc: "Get college & course suggestions aligned with your strengths and goals." },
    { title: "Internship Match", desc: "Find internships tailored to your domain and skill level." },
    { title: "Scholarship Finder", desc: "Access scholarships that fit your profile — easily & instantly." },
    { title: "Mentorship & Counseling", desc: "Connect with experienced mentors & alumni for career clarity." },
  ];

  return (
    <section id="features" className="py-24 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Why <span className="text-indigo-600">Students</span> Love Udaan
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Card key={i} className="bg-white/80 hover:bg-white transition rounded-2xl shadow-sm hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-indigo-700">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
