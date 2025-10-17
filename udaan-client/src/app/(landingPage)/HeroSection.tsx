'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl font-extrabold max-w-3xl leading-tight"
      >
        Discover <span className="text-indigo-600">Your True Path</span> — AI-Powered Career & Academic Guidance
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
    </main>
  );
}
