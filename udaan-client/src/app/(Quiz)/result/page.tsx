'use client'

import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ResultPage() {
  const router = useRouter()

  const recommendations = useAppSelector((state) => state.assessment.recommendations)
  const processedData = useAppSelector((state) => state.assessment.processedData)
  console.log("recommendation " , recommendations , "\n", "Processed data", processedData)
  
  useEffect(() => {
    if (!recommendations || recommendations.length === 0) {
      router.replace('/quiz')
    }
  }, [recommendations, router])

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading your results...
      </div>
    )
  }

  const results = Array.isArray(recommendations)
    ? recommendations
    : [recommendations]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-3">
          Your Personalized Career Results 🎯
        </h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Based on your aptitude, interests, and personality — here are the best-matched careers for you.
        </p>
      </div>

      {/* Career Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {results.map((career, idx) => (
          <div
            key={career.slug || idx}
            onClick={() => router.push(`/career/${career.slug}`)}
            className="cursor-pointer bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="text-4xl mb-4">{career.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{career.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{career.type}</p>

            {/* Confidence bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${career.confidence || 0}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Confidence:</strong> {career.confidence || 0}%
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {career.description || 'Description coming soon.'}
            </p>

            {/* Jobs */}
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-700 mb-1">Top Jobs:</p>
              <ul className="text-sm text-gray-600 list-disc ml-4 space-y-1">
                {career.jobs?.slice(0, 4).map((job, i) => (
                  <li key={i}>{job.title}</li>
                ))}
              </ul>
            </div>

            {/* Feedback */}
            {career.feedback && career.feedback.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Suggested Improvements:
                </p>
                <ul className="text-xs text-gray-600 list-disc ml-4 space-y-1">
                  {career.feedback.slice(0, 3).map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Strength Summary */}
      {processedData && processedData.results && (
        <div className="mt-12 text-center max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Your Key Strengths 💡
          </h2>
          <p className="text-gray-600 text-sm">
            {Object.entries(processedData.results)
              .map(([key, val]) => `${key}`)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}
