'use client'

import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CareerRecommendationCard from '@/components/CareerRecommendationCard'

export default function ResultPage() {
  const router = useRouter()

  const recommendations = useAppSelector((state) => state.assessment.recommendations)
  const processedData = useAppSelector((state) => state.assessment.processedData)



  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading your results...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-3">
          Recommended Careers for You 🎯
        </h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Based on your quiz performance and strengths, here are the top career paths most aligned with your profile.
        </p>
      </div>

      {/* Career Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {recommendations.map((career) => (
          <CareerRecommendationCard
            key={career.slug}
            icon={career.icon}
            title={career.title}
            type={career.type}
            confidence={career.confidence}
            description={career.description}
            jobs={career.jobs}
            onClick={() => router.push(`/career/${career.slug}`)}
          />
        ))}
      </div>

      {/* Strength Summary */}
      {processedData && (
        <div className="mt-12 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Key Strengths 💡</h2>
          <p className="text-gray-600 text-sm">
            {Object.entries(processedData)
              .map(([key]) => key)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}
