// lib/quiz.ts

export interface Question {
  id: number
  category: string
  interest_type?: string
  subfield?: string
  question: string
}

export interface Category {
  description: string
  subfields: string[]
  score: number
}

export interface QuizData {
  title: string
  description: string
  scale: string[]
  categories: Record<string, Category>
  questions: Question[]
}

export interface QuizType {
  quiz: QuizData
}

export interface Responses {
  [id: number]: number
}

export interface ResultCategory {
  [subfield: string]: number | { total: number; count: number }
}

export interface QuizResult {
  Interest: ResultCategory
  Aptitude: ResultCategory
  SkillLevel: ResultCategory
  Personality: ResultCategory
  ValuesMotivation: ResultCategory
}

const Quiz: QuizType = {
  quiz: {
    title: "Career Interest & Aptitude Assessment",
    description:
      "A psychometric test that evaluates your interests, skills, aptitude, personality, and motivations to recommend the most suitable career paths.",
    scale: [
      "Strongly Disagree",
      "Disagree",
      "Slightly Disagree",
      "Neutral",
      "Slightly Agree",
      "Agree",
      "Strongly Agree"
    ],
    categories: {
      Interest: {
        description:
          "Identifies what type of work or activity naturally excites the student (based on RIASEC model).",
        subfields: [
          "Realistic",
          "Investigative",
          "Artistic",
          "Social",
          "Enterprising",
          "Conventional"
        ],
        score: 0
      },
      Aptitude: {
        description:
          "Measures how effectively a student can learn or apply logic, numbers, creativity, and communication.",
        subfields: [
          "Logical Reasoning",
          "Numerical Ability",
          "Creativity",
          "Communication",
          "Time Management"
        ],
        score: 0
      },
      "Skill Level": {
        description:
          "Assesses the student's current technical, analytical, creative, business, and communication skills.",
        subfields: [
          "Technical Skills",
          "Analytical Skills",
          "Creative Tools",
          "Business Knowledge",
          "Public Speaking"
        ],
        score: 0
      },
      Personality: {
        description:
          "Analyzes behavioral tendencies like discipline, sociability, resilience, planning style, and curiosity.",
        subfields: [
          "Structure Preference",
          "Social Orientation",
          "Emotional Stability",
          "Planning Style",
          "Curiosity"
        ],
        score: 0
      },
      "Values & Motivation": {
        description:
          "Explores personal values and motivations that define long-term job satisfaction and drive.",
        subfields: [
          "Security",
          "Social Impact",
          "Recognition",
          "Innovation",
          "Independence"
        ],
        score: 0
      }
    },
    questions: [
  // INTEREST (6 subfields × ~3 each = 18)
  {
    "id": 1,
    "category": "Interest",
    "subfield": "Realistic",
    "question": "I enjoy building, fixing, or working with tools, machines, or physical objects."
  },
  {
    "id": 2,
    "category": "Interest",
    "subfield": "Realistic",
    "question": "I like practical, hands-on work more than sitting behind a desk."
  },
  {
    "id": 3,
    "category": "Interest",
    "subfield": "Realistic",
    "question": "I prefer outdoor or mechanical tasks over office-based ones."
  },

  {
    "id": 4,
    "category": "Interest",
    "subfield": "Investigative",
    "question": "I enjoy solving logical or analytical problems such as puzzles or coding challenges."
  },
  {
    "id": 5,
    "category": "Interest",
    "subfield": "Investigative",
    "question": "I like researching or exploring how scientific or technical things work."
  },
  {
    "id": 6,
    "category": "Interest",
    "subfield": "Investigative",
    "question": "I enjoy working with data, experiments, or detailed analysis."
  },

  {
    "id": 7,
    "category": "Interest",
    "subfield": "Artistic",
    "question": "I enjoy expressing myself creatively through music, art, or writing."
  },
  {
    "id": 8,
    "category": "Interest",
    "subfield": "Artistic",
    "question": "I like thinking outside the box and creating something original."
  },
  {
    "id": 9,
    "category": "Interest",
    "subfield": "Artistic",
    "question": "I am drawn to visual design, performance, or storytelling."
  },

  {
    "id": 10,
    "category": "Interest",
    "subfield": "Social",
    "question": "I enjoy helping people learn, grow, or solve their problems."
  },
  {
    "id": 11,
    "category": "Interest",
    "subfield": "Social",
    "question": "I find satisfaction in volunteering or supporting others."
  },
  {
    "id": 12,
    "category": "Interest",
    "subfield": "Social",
    "question": "I prefer working with people rather than working alone."
  },

  {
    "id": 13,
    "category": "Interest",
    "subfield": "Enterprising",
    "question": "I enjoy taking charge and persuading others to achieve goals."
  },
  {
    "id": 14,
    "category": "Interest",
    "subfield": "Enterprising",
    "question": "I like planning or managing projects or events."
  },
  {
    "id": 15,
    "category": "Interest",
    "subfield": "Enterprising",
    "question": "I feel confident speaking in front of people or motivating a team."
  },

  {
    "id": 16,
    "category": "Interest",
    "subfield": "Conventional",
    "question": "I enjoy organizing, managing, or maintaining records and data."
  },
  {
    "id": 17,
    "category": "Interest",
    "subfield": "Conventional",
    "question": "I like working with established systems, procedures, or documentation."
  },
  {
    "id": 18,
    "category": "Interest",
    "subfield": "Conventional",
    "question": "I am detail-oriented and like keeping things structured."
  },

  // APTITUDE (5 subfields × 2 = 10)
  {
    "id": 19,
    "category": "Aptitude",
    "subfield": "Logical Reasoning",
    "question": "I can quickly identify patterns, connections, or flaws in ideas or problems."
  },
  {
    "id": 20,
    "category": "Aptitude",
    "subfield": "Logical Reasoning",
    "question": "I enjoy solving complex problems that require step-by-step reasoning."
  },
  {
    "id": 21,
    "category": "Aptitude",
    "subfield": "Numerical Ability",
    "question": "I find it easy to understand statistics, data, or numerical trends."
  },
  {
    "id": 22,
    "category": "Aptitude",
    "subfield": "Numerical Ability",
    "question": "I am confident in performing quick mental calculations."
  },
  {
    "id": 23,
    "category": "Aptitude",
    "subfield": "Creativity",
    "question": "I can come up with new ideas or creative approaches to solve problems."
  },
  {
    "id": 24,
    "category": "Aptitude",
    "subfield": "Creativity",
    "question": "I like experimenting with new methods or combining ideas in unique ways."
  },
  {
    "id": 25,
    "category": "Aptitude",
    "subfield": "Communication",
    "question": "I can explain complex ideas clearly to others."
  },
  {
    "id": 26,
    "category": "Aptitude",
    "subfield": "Communication",
    "question": "I am comfortable expressing opinions or debating constructively."
  },
  {
    "id": 27,
    "category": "Aptitude",
    "subfield": "Time Management",
    "question": "I can manage multiple tasks efficiently without losing focus."
  },
  {
    "id": 28,
    "category": "Aptitude",
    "subfield": "Time Management",
    "question": "I rarely miss deadlines and stay organized under pressure."
  },

  // SKILL LEVEL (5 × 2 = 10)
  {
    "id": 29,
    "category": "Skill Level",
    "subfield": "Technical Skills",
    "question": "I can adapt to new technologies or tools quickly."
  },
  {
    "id": 30,
    "category": "Skill Level",
    "subfield": "Technical Skills",
    "question": "I can troubleshoot or fix common technical issues on my own."
  },
  {
    "id": 31,
    "category": "Skill Level",
    "subfield": "Analytical Skills",
    "question": "I can analyze data and make logical conclusions."
  },
  {
    "id": 32,
    "category": "Skill Level",
    "subfield": "Analytical Skills",
    "question": "I can identify causes behind patterns or trends in data."
  },
  {
    "id": 33,
    "category": "Skill Level",
    "subfield": "Creative Tools",
    "question": "I can use creative design or editing tools efficiently."
  },
  {
    "id": 34,
    "category": "Skill Level",
    "subfield": "Creative Tools",
    "question": "I have created designs, videos, or digital content using creative software."
  },
  {
    "id": 35,
    "category": "Skill Level",
    "subfield": "Business Knowledge",
    "question": "I understand basic business terms like profit, marketing, and budgeting."
  },
  {
    "id": 36,
    "category": "Skill Level",
    "subfield": "Business Knowledge",
    "question": "I can recognize what makes a product or service appealing to customers."
  },
  {
    "id": 37,
    "category": "Skill Level",
    "subfield": "Public Speaking",
    "question": "I can confidently deliver a presentation or speak in front of a group."
  },
  {
    "id": 38,
    "category": "Skill Level",
    "subfield": "Public Speaking",
    "question": "I can adapt my tone and style based on my audience."
  },

  // PERSONALITY (5 × 2 = 10)
  {
    "id": 39,
    "category": "Personality",
    "subfield": "Structure Preference",
    "question": "I prefer structured plans over spontaneous decisions."
  },
  {
    "id": 40,
    "category": "Personality",
    "subfield": "Structure Preference",
    "question": "I get uncomfortable when things are unorganized or unclear."
  },
  {
    "id": 41,
    "category": "Personality",
    "subfield": "Social Orientation",
    "question": "I gain energy by spending time and collaborating with people."
  },
  {
    "id": 42,
    "category": "Personality",
    "subfield": "Social Orientation",
    "question": "I enjoy teamwork and group activities more than solo tasks."
  },
  {
    "id": 43,
    "category": "Personality",
    "subfield": "Emotional Stability",
    "question": "I stay calm and positive even during stressful times."
  },
  {
    "id": 44,
    "category": "Personality",
    "subfield": "Emotional Stability",
    "question": "I recover quickly after facing failure or criticism."
  },
  {
    "id": 45,
    "category": "Personality",
    "subfield": "Planning Style",
    "question": "I plan my activities well in advance rather than improvising last minute."
  },
  {
    "id": 46,
    "category": "Personality",
    "subfield": "Planning Style",
    "question": "I often create to-do lists or schedules to stay on track."
  },
  {
    "id": 47,
    "category": "Personality",
    "subfield": "Curiosity",
    "question": "I love exploring new ideas, technologies, or cultures."
  },
  {
    "id": 48,
    "category": "Personality",
    "subfield": "Curiosity",
    "question": "I often ask questions or research topics beyond what’s required."
  },

  // VALUES & MOTIVATION (5 × 2 = 10)
  {
    "id": 49,
    "category": "Values & Motivation",
    "subfield": "Security",
    "question": "I prefer stable, long-term career options over risky ventures."
  },
  {
    "id": 50,
    "category": "Values & Motivation",
    "subfield": "Social Impact",
    "question": "I am motivated by careers that make a positive difference to society."
  },
  {
    "id": 51,
    "category": "Values & Motivation",
    "subfield": "Recognition",
    "question": "I feel driven when my achievements are noticed and appreciated."
  },
  {
    "id": 52,
    "category": "Values & Motivation",
    "subfield": "Innovation",
    "question": "I enjoy thinking about new ways to improve or reinvent existing ideas."
  },
  {
    "id": 53,
    "category": "Values & Motivation",
    "subfield": "Independence",
    "question": "I like having freedom to make my own decisions and work in my own way."
  }
]

  }
}

export default Quiz

// ✅ TypeScript-safe result calculator
export function calculateQuizResults(responses: Responses): QuizResult {
  const quiz = Quiz.quiz

  const result: QuizResult = {
    Interest: {},
    Aptitude: {},
    SkillLevel: {},
    Personality: {},
    ValuesMotivation: {}
  }

  quiz.questions.forEach((q) => {
    const value = responses[q.id]
    if (!value) return

    const catKey = q.category.replace(/\s|&/g, '') as keyof QuizResult
    const sub = q.subfield?.replace(/\s/g, '') || 'General'

    if (!result[catKey][sub]) {
      result[catKey][sub] = { total: 0, count: 0 }
    }

    const current = result[catKey][sub] as { total: number; count: number }
    current.total += value
    current.count += 1
  })

  for (const category of Object.keys(result) as (keyof QuizResult)[]) {
  const categoryData = result[category]

  for (const sub of Object.keys(categoryData)) {
    const value = categoryData[sub]

    if (typeof value === "object" && value !== null && "total" in value && "count" in value) {
      const { total, count } = value as { total: number; count: number }
      categoryData[sub] = +(total / count).toFixed(2)
    }
  }
}


  return result
}
