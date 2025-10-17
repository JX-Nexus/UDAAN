'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
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
  )
}
