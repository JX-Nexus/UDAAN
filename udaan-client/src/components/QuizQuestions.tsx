'use client'

import { useState } from 'react'

type Props = {
  question: string
  onChange?: (value: number) => void
  selected?: number
  scale?: string[]
}

export default function QuizQuestions({ question, onChange, selected: externalSelected }: Props) {
  const [selected, setSelected] = useState<number | null>(externalSelected || null)

  const options = [1, 2, 3, 4, 5, 6, 7]

  // Updated color tone and gradient balance
  const styleMap: Record<number, { border: string; gradient: string }> = {
    1: { border: 'border-green-500', gradient: 'bg-gradient-to-br from-green-400 to-green-600' },
    2: { border: 'border-green-500', gradient: 'bg-gradient-to-br from-green-300 to-green-500' },
    3: { border: 'border-green-400', gradient: 'bg-gradient-to-br from-green-200 to-green-400' },
    4: { border: 'border-gray-400', gradient: 'bg-gradient-to-br from-gray-200 to-gray-400' }, // neutral
    5: { border: 'border-purple-400', gradient: 'bg-gradient-to-br from-purple-200 to-purple-400' },
    6: { border: 'border-purple-500', gradient: 'bg-gradient-to-br from-purple-400 to-purple-600' },
    7: { border: 'border-purple-600', gradient: 'bg-gradient-to-br from-purple-500 to-purple-700' },
  }

  // Bigger sizes for better visual balance (Agree/Disagree bigger, Neutral smallest)
  const sizeMap: Record<number, string> = {
    1: 'w-14 h-14',
    2: 'w-12 h-12',
    3: 'w-10 h-10',
    4: 'w-8 h-8',
    5: 'w-10 h-10',
    6: 'w-12 h-12',
    7: 'w-14 h-14',
  }

  const handleSelect = (num: number) => {
    setSelected(num)
    if (onChange) onChange(num)
  }

  return (
    <div className="w-full flex flex-col items-start space-y-6 p-6">
      {/* Question */}
      <h2 className="text-2xl font-semibold text-gray-900 text-left leading-relaxed max-w-4xl">
        {question}
      </h2>

      {/* Options */}
      <div
        className="flex items-center justify-center gap-6 w-full mt-4"
        role="radiogroup"
        aria-label={question}
      >
        <span className="text-green-600 font-semibold text-lg select-none">Agree</span>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {options.map((num) => {
            const isSelected = selected === num
            const { border, gradient } = styleMap[num]
            const size = sizeMap[num]

            return (
              <button
                key={num}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`Option ${num}`}
                tabIndex={0}
                onClick={() => handleSelect(num)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelect(num)
                  }
                }}
                className={[
                  'rounded-full flex items-center justify-center transition-all duration-300 ease-in-out',
                  'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-opacity-60',
                  'hover:scale-110',
                  border,
                  size,
                  isSelected ? `${gradient} shadow-xl` : 'bg-transparent',
                ].join(' ')}
              ></button>
            )
          })}
        </div>

        <span className="text-purple-600 font-semibold text-lg select-none">Disagree</span>
      </div>
    </div>
  )
}
