'use client'

import React, { useState } from 'react'
import careerService from '@/services/career.service'
import Quiz, { calculateQuizResults } from '@/lib/quiz'

export default function TestPage() {
  const [processedData, setProcessedData] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [rawResults, setRawResults] = useState(null)

  const generateSmartAnswers = () => {
    const answers = []
    const oppositeTracker = {}

    for (const q of Quiz.quiz.questions) {
      let score
      const text = q.question.toLowerCase()

      if (text.includes('outdoor') || text.includes('social')) {
        score = Math.floor(Math.random() * 3) + 5
        oppositeTracker['introvert'] = 2
      } else if (text.includes('alone') || text.includes('introvert')) {
        score = oppositeTracker['introvert'] || Math.floor(Math.random() * 3) + 1
      } else if (text.includes('data') || text.includes('analyze')) {
        score = Math.floor(Math.random() * 3) + 5
      } else if (text.includes('creative') || text.includes('art')) {
        score = Math.floor(Math.random() * 3) + 4
      } else {
        score = Math.floor(Math.random() * 7) + 1
      }

      answers.push({
        id: q.id,
        category: q.category || 'General',
        subfield: q.subfield || null,
        score,
      })
    }
    return answers
  }

  const handleSmartTest = async () => {
    setLoading(true)
    try {
      const smartAnswers = generateSmartAnswers()
      const formatted = Object.fromEntries(smartAnswers.map(r => [r.id, r.score]))
      const results = calculateQuizResults(formatted)
      setRawResults(results)

      console.log('🧠 Smart answers:', smartAnswers)
      console.log('🧩 Processed results:', results)

      const res = await careerService.getCareer({ quizAnswers: smartAnswers }, results)
      console.log('✅ Backend Response:', res)

      const data = res?.data || {}
      setProcessedData(data.archetype || results)
      const recs = data.recommendations?.map(r => ({ ...r.results })) || []
      setRecommendations(recs)
    } catch (err) {
      console.error('❌ Error:', err.message)
      alert('Test failed — check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* LEFT — Processed Data */}
      <div className="w-full md:w-1/3 bg-white border-r border-gray-200 p-6 overflow-auto shadow-inner">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
          🧠 Processed Insights
        </h2>

        {!processedData ? (
          <div className="text-gray-500 text-sm">No data yet. Run Smart Test 👇</div>
        ) : (
          <div className="space-y-5">
            {/* Archetype Card */}
            {processedData.name && (
              <div className="p-4 border rounded-xl bg-indigo-50 shadow-sm">
                <h3 className="font-semibold text-indigo-700 text-lg">
                  {processedData.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{processedData.description}</p>
              </div>
            )}

            {/* Strengths */}
            {processedData.strengths && (
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Strengths 💪</h4>
                <div className="flex flex-wrap gap-2">
                  {processedData.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            {processedData.feedback && processedData.feedback.length > 0 && (
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Feedback 🔍</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {processedData.feedback.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Run Button */}
        <button
          onClick={handleSmartTest}
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow"
        >
          {loading ? 'Generating...' : 'Run Smart Test 🤖'}
        </button>
      </div>

      {/* RIGHT — Recommendations + Traits */}
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          🎯 AI Career Recommendations
        </h2>

        {recommendations.length === 0 ? (
          <p className="text-gray-500 text-sm">No recommendations yet. Run Smart Test!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {recommendations.map((career, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-3xl opacity-10">{career.icon}</div>
                <div className="text-3xl">{career.icon}</div>
                <h3 className="font-semibold text-gray-800 mt-2">{career.title}</h3>
                <p className="text-xs text-indigo-600 font-medium">{career.type}</p>

                {/* Confidence Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Confidence</span>
                    <span>{career.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${career.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {career.description}
                </p>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-800 mb-1">Roles:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {career.jobs?.slice(0, 3).map((job, i) => (
                      <li key={i}>{job.title}</li>
                    ))}
                  </ul>
                </div>

                {career.feedback?.length > 0 && (
                  <div className="mt-3 border-t border-gray-200 pt-2 text-xs text-gray-500 italic">
                    {career.feedback.slice(0, 1)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 📊 Detailed Trait Breakdown */}
        {rawResults && (
          <div className="bg-white border w-full rounded-xl p-6 shadow-md">
            <h4 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
              🧩 Detailed Trait Breakdown
              <span className="text-xs font-normal text-gray-500">(based on quiz analysis)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(rawResults).map(([category, traits]) => {
                if (typeof traits !== 'object') return null
                const avg =
                  Object.values(traits).reduce((a, b) => a + b, 0) /
                  Object.values(traits).length

                return (
                  <div
                    key={category}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all relative"
                  >
                    <h3 className="font-semibold text-indigo-700 text-sm mb-3 uppercase tracking-wide flex justify-between">
                      {category}
                      <span className="text-gray-500 font-normal text-xs">
                        Avg: {avg.toFixed(1)}
                      </span>
                    </h3>

                    <div className="space-y-2">
                      {Object.entries(traits).map(([trait, value]) => (
                        <div key={trait}>
                          <div className="flex justify-between text-xs text-gray-700">
                            <span>{trait}</span>
                            <span className="font-medium text-gray-600">{value}</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full"
                              style={{ width: `${Math.min(value * 14, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
