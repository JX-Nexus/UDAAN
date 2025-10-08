"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function UdaanLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 sm:gap-3">
           <Image
              src="/logo.svg"
              alt="Udaan Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            <span className="text-indigo-600 font-bold">U</span>daan
          </h1>
        </div>


        <nav className="hidden sm:flex gap-6 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition">Features</a>
          <a href="#how" className="hover:text-slate-900 transition">How it Works</a>
          <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
        </nav>

        <Button>Get Started</Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold max-w-3xl leading-tight"
        >
          Personalized Career & Academic Guidance —{" "}
          <span className="text-indigo-600">Made for You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-slate-600 max-w-2xl"
        >
          India's first AI-powered platform helping students find clarity with smart recommendations, roadmap planning, internships, and scholarships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <Input placeholder="Enter your email to begin your journey" />
          <Button size="lg" className="flex-1">Get Started</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 text-sm text-slate-500"
        >
          No signup required • Explore your personalized roadmap instantly
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Students Use Udaan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature title="Smart Recommendations" desc="Top 5 college & course options based on your strengths and interests." />
            <Feature title="Internship Match" desc="Get 3–5 personalized internship suggestions powered by AI." />
            <Feature title="Scholarship Finder" desc="Discover scholarships tailored to your academic performance." />
            <Feature title="Mentorship & Counseling" desc="Connect with mentors and alumni for real-time advice." />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-12">How Udaan Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: "Take Quiz", text: "Identify your strengths, interests & aptitudes." },
            { step: 2, title: "View Roadmap", text: "Get a visual roadmap with skill milestones & goals." },
            { step: 3, title: "Achieve", text: "Apply for internships & scholarships that fit your path." },
          ].map(({ step, title, text }) => (
            <motion.div key={step} whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="text-indigo-600 font-bold text-2xl">{step}</div>
              <h3 className="text-lg font-semibold mt-2">{title}</h3>
              <p className="text-slate-600 text-sm mt-2">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold">Ready to Take Off with 🕊 Udaan?</h2>
          <p className="mt-3 text-slate-100">
            Start your personalized roadmap today and see your future take shape.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button size="lg" variant="secondary">Get Started Free</Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-10 text-center text-sm text-slate-500">
        
      </footer>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <Card className="bg-white/70 hover:bg-white transition rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
}
