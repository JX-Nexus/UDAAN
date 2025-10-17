"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-gradient-to-r from-white/70 via-white/60 to-white/50 border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="flex justify-between items-center px-6 sm:px-10 py-4 max-w-7xl mx-auto w-full">
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <Image
            src="/logo.svg"
            alt="Udaan Logo"
            width={42}
            height={42}
            className="object-contain drop-shadow-[0_0_4px_rgba(59,130,246,0.4)]"
            priority
          />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 font-extrabold">
              U
            </span>
            daan
          </h1>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden sm:flex gap-10 text-[15px] font-medium"
        >
          {["Features", "How it Works", "Contact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              whileHover={{ scale: 1.05 }}
              className="relative text-slate-700 hover:text-indigo-600 transition-all duration-300 group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </motion.a>
          ))}
        </motion.nav>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/sign-in"
            className="bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white shadow-lg shadow-indigo-500/25 px-5 py-2.5 rounded-xl text-sm font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-sky-400/30"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
