'use client'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    { step: 1, title: "Take Quiz", text: "Discover your strengths, interests & aptitudes." },
    { step: 2, title: "View Roadmap", text: "Get a visual roadmap with clear skill milestones." },
    { step: 3, title: "Achieve", text: "Apply for internships & scholarships that fit your goals." },
  ]

  return (
    <section id="how" className="py-24 text-center px-6 bg-gradient-to-br from-white via-sky-50 to-indigo-50">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12">
        How <span className="text-indigo-600">Udaan</span> Works
      </h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {steps.map(({ step, title, text }) => (
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
  )
}
