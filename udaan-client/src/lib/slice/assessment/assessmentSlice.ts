import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Answer {
  id: number
  category: string
  subfield?: string
  score: number
}
interface Job {
  title: string
}
interface CareerRecommendation {
  icon: string
  title: string
  slug: string
  type: string
  confidence: number
  description: string
  jobs: Job[]
}


interface AssessmentState {
  answers: Record<number, Answer>
  processedData: Record<string, any> | null
  recommendations: CareerRecommendation[] | null
  loading: boolean
}

const initialState: AssessmentState = {
  answers: {},
  processedData: null,
  recommendations: null,
  loading: false,
}

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers[action.payload.id] = action.payload
    },
    setProcessedData: (state, action: PayloadAction<Record<string, any>>) => {
      state.processedData = action.payload
    },
    setRecommendations: (state, action: PayloadAction<CareerRecommendation[]>) => {
      state.recommendations = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    resetAssessment: (state) => {
      state.answers = {}
      state.processedData = null
      state.recommendations = null
    },
  },
})

export const {
  setAnswer,
  setProcessedData,
  setRecommendations,
  setLoading,
  resetAssessment,
} = assessmentSlice.actions

export default assessmentSlice.reducer
