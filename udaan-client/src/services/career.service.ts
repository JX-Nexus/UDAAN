import axios from "axios";
import type { ProcessedDataSchema, RawQuizSchema, CreateCareerSchema } from "@/schemas/career.schema";

export class CareerService {
  // ✅ Send both raw quiz data and processed data
 async getCareer(quizAnswers: RawQuizSchema, processedData: ProcessedDataSchema) {
    try {
      const payload: CreateCareerSchema = {
        quizAnswers: quizAnswers.quizAnswers,
        processedData: processedData,
      }

      // 🧠 Real backend call (commented out for now)
      /*
      const res = await axios.post("/api/career/submit", payload, {
        withCredentials: true, // include auth cookies if needed
      });
      return res.data;
      */

      // 🧩 Mock response (until backend is ready)
      const mockResponse = {
        "success": true,
        "message": "Mocked recommendation data.",
        "careers": [
          {
            "icon": "💻",
            "title": "B.Tech in Computer Science & AI",
            "slug": "computer-science-ai",
            "type": "Course",
            "confidence": 92,
            "description": "Perfect for strong interest in technology, coding, and hands-on projects that involve AI, software, and data-driven solutions.",
            "jobs": [
              { "title": "AI/ML Engineer" },
              { "title": "Data Scientist" },
              { "title": "Full-Stack Developer" },
              { "title": "Cloud/DevOps Engineer" },
              { "title": "Research Scientist" }
            ]
          },
          {
            "icon": "⚙️",
            "title": "B.Tech in Mechanical Engineering",
            "slug": "mechanical-engineering",
            "type": "Course",
            "confidence": 81,
            "description": "Great for individuals who enjoy practical workshops, building machines, and understanding how things work in the physical world.",
            "jobs": [
              { "title": "Design Engineer" },
              { "title": "Automotive Engineer" },
              { "title": "Aerospace Engineer" },
              { "title": "Product Developer" },
              { "title": "Public Sector Engineer" }
            ]
          },
          {
            "icon": "📊",
            "title": "B.Sc. in Data Science & Analytics",
            "slug": "data-science-analytics",
            "type": "Course",
            "confidence": 75,
            "description": "Ideal for analytical minds who love solving problems through data, statistics, and computational models.",
            "jobs": [
              { "title": "Data Analyst" },
              { "title": "Business Intelligence Specialist" },
              { "title": "Machine Learning Engineer" },
              { "title": "Financial Analyst" },
              { "title": "Quantitative Researcher" }
            ]
          }
        ],
        "strengths": {
          "Analytical Thinking": 8,
          "Creativity": 7,
          "Communication": 6
        }
      }


      // ⏳ Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      return mockResponse
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to submit quiz. Please try again."
        console.error("❌ CareerService error:", error.response)
        throw new Error(message)
      }
      throw new Error("Something went wrong while submitting career data.")
    }
  }
}

const careerService = new CareerService();
export default careerService;
