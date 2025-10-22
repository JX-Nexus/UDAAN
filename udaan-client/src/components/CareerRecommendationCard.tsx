'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Job {
  title: string
}

interface CareerRecommendationCardProps {
  icon?: string
  title: string
  type: string
  confidence: number
  description: string
  jobs: Job[]
  onClick?: () => void
}

export default function CareerRecommendationCard({
  icon,
  title,
  type,
  confidence,
  description,
  jobs,
  onClick,
}: CareerRecommendationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
    >
      {/* Icon */}
      <div className="text-3xl mb-3">{icon}</div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>

      {/* Badge */}
      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-md mb-3">
        {type}
      </span>

      {/* Confidence */}
      <p className="text-emerald-600 font-semibold text-sm mb-1">
        Confidence level: <span className="font-bold">{confidence}%</span>
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Jobs */}
      <div className="flex flex-wrap gap-2">
        {jobs.map((job, i) => (
          <span
            key={i}
            className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-indigo-100 transition"
          >
            {job.title}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
