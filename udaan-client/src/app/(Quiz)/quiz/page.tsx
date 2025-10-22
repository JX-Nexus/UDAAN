'use client'

import React, { useState } from 'react'
import QuizQuestions from '@/components/QuizQuestions'
import Quiz, { calculateQuizResults } from '@/lib/quiz'
import { useAppDispatch } from "@/lib/hooks"
import { setProcessedData, setRecommendations  } from '@/lib/slice/assessment/assessmentSlice'
import careerService from "@/services/career.service"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const quiz = Quiz.quiz

  const [responses, setResponses] = useState<
    Record<number, { id: number; category: string; subfield?: string; score: number }>
  >({})

  const [page, setPage] = useState(1)

  const questionsPerPage = 5
  const totalPages = Math.ceil(quiz.questions.length / questionsPerPage)
  const startIndex = (page - 1) * questionsPerPage
  const currentQuestions = quiz.questions.slice(
    startIndex,
    startIndex + questionsPerPage
  )

  // ✅ Fixed to include category + subfield from quiz.questions
  const handleAnswer = (
    id: number,
    score: number,
    category?: string,
    subfield?: string
  ) => {
    const question = quiz.questions.find((q) => q.id === id)
    const questionCategory = category || question?.category || 'General'
    const questionSubfield = subfield || question?.subfield

    setResponses((prev) => ({
      ...prev,
      [id]: { id, category: questionCategory, subfield: questionSubfield, score },
    }))
  }

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1)
  }

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1)
  }

  // ✅ Fixed handleSubmit to pass correct format to calculateQuizResults
const handleSubmit = async () => {
  const rawResponses = Object.values(responses) // [{ id, category, subfield, score }]
  const formattedResponses = Object.fromEntries(
    rawResponses.map((r) => [r.id, r.score]) // { 1: 3, 2: 5, ... }
  )

  const results = calculateQuizResults(formattedResponses)

  try {
    // ✅ Send to backend
    console.log(results)
    const backendRes = await careerService.getCareer(
      { quizAnswers: rawResponses },
      results
    )

    console.log("✅ Backend response:", backendRes)

    // ✅ Store both processed and recommended careers in Redux
    dispatch(setProcessedData(results))
    if (backendRes?.careers) {
      dispatch(setRecommendations(backendRes.careers))
    }

    // ✅ Redirect to results page
    // router.push("/results")
  } catch (err: any) {
    console.error("❌ Submission failed:", err.message)
    alert("Something went wrong while submitting your results.")
  }
}

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 py-10 px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          {quiz.title}
        </h1>
        <p className="text-gray-600">{quiz.description}</p>
      </div>

      {/* Quiz Container */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.05)] p-10 flex flex-col items-center transition-all duration-300">
        <div className="w-full flex flex-col gap-10">
          {currentQuestions.map((q) => (
            <div
              key={q.id}
              className="flex flex-col items-start justify-start w-full"
            >
              <div className="mb-2 text-sm text-indigo-600 font-semibold uppercase tracking-wide"></div>

              <QuizQuestions
                question={q.question}
                onChange={(value) =>
                  handleAnswer(q.id, value, q.category, q.subfield)
                }
                selected={responses[q.id]?.score || 0}
                scale={quiz.scale}
              />

              <div className="w-full h-px bg-gray-200 my-6" />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-10 flex items-center justify-between w-full max-w-md">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Previous
          </button>

          <p className="text-gray-600 font-medium">
            Step {page} of {totalPages}
          </p>

          {page < totalPages ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mt-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${
                (Object.keys(responses).length / quiz.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
