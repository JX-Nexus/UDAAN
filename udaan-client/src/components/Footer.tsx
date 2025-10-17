// components/footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-200 py-8 px-4 flex flex-col items-center justify-center text-center shadow-[0_-2px_20px_rgba(0,0,0,0.15)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-2"
      >
        <p className="text-sm md:text-base font-medium tracking-wide text-slate-100">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-400">Udaan</span> — Empowering Every Student’s Journey ✈️
        </p>

        <p className="text-xs md:text-sm text-slate-400">
          Built by{" "}
          <Link
            href="https://www.linkedin.com/in/jayesh-kathale-45a5ab293"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-400 hover:text-cyan-300 transition-colors duration-200"
          >
            JX Nexus
          </Link>
        </p>
      </motion.div>
    </footer>
  );
}
