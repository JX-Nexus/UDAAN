"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import SIHTimeline from "@/components/Timeline";
import Link from "next/link";

export default function UdaanLanding() {
  return (
    <div className="min-h-screen flex flex-col text-slate-900 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 sm:px-10 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.svg"
            alt="Udaan Logo"
            width={42}
            height={42}
            className="object-contain"
            priority
          />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            <span className="text-indigo-600 font-extrabold">U</span>daan
          </h1>
        </div>

        <nav className="hidden sm:flex gap-6 text-sm text-slate-600 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#how" className="hover:text-indigo-600 transition">How it Works</a>
          <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
        </nav>

        <Link href="/sign-in" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow px-4 py-2 rounded-md transition">
          Get Started
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold max-w-3xl leading-tight"
        >
          Discover <span className="text-indigo-600">Your True Path</span> —
          AI-Powered Career & Academic Guidance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-slate-600 max-w-2xl"
        >
          Udaan helps students across India find clarity and confidence through personalized roadmaps, 
          smart recommendations, internships, and scholarship discovery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <Input placeholder="Enter your email to begin your journey" className="text-base" />
          <Button size="lg" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
            Start Now
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 text-sm text-slate-500"
        >
          No signup required • Explore your roadmap instantly 🚀
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14"
        >
         
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Why <span className="text-indigo-600">Students</span> Love Udaan
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              title="Smart Recommendations"
              desc="Get college & course suggestions aligned with your strengths and goals."
            />
            <Feature
              title="Internship Match"
              desc="Find internships tailored to your domain and skill level."
            />
            <Feature
              title="Scholarship Finder"
              desc="Access scholarships that fit your profile — easily & instantly."
            />
            <Feature
              title="Mentorship & Counseling"
              desc="Connect with experienced mentors & alumni for career clarity."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-24 text-center px-6 bg-gradient-to-br from-white via-sky-50 to-indigo-50">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          How <span className="text-indigo-600">Udaan</span> Works
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            { step: 1, title: "Take Quiz", text: "Discover your strengths, interests & aptitudes." },
            { step: 2, title: "View Roadmap", text: "Get a visual roadmap with clear skill milestones." },
            { step: 3, title: "Achieve", text: "Apply for internships & scholarships that fit your goals." },
          ].map(({ step, title, text }) => (
            <motion.div
              key={step}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition"
            >
              <div className="text-indigo-600 font-extrabold text-3xl">{step}</div>
              <h3 className="text-xl font-semibold mt-3">{title}</h3>
              <p className="text-slate-600 text-sm mt-3">{text}</p>
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
          <h2 className="text-4xl sm:text-5xl font-bold">Ready to Take Off with Udaan?</h2>
          <p className="mt-3 text-slate-100 max-w-xl mx-auto">
            Begin your personalized journey today — let’s shape your future together.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button
              size="lg"
              variant="secondary"
              className="text-indigo-600 bg-white hover:bg-slate-100"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-10 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Udaan — Empowering India’s Students 🚀</p>
        <p className="mt-2">
          Built by JX Nexus
        </p>
      </footer>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="bg-white/80 hover:bg-white transition rounded-2xl shadow-sm hover:shadow-md">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-indigo-700">{title}</h3>
        <p className="text-slate-600 text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
}
