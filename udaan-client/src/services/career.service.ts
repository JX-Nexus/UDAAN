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
      
      const res = await axios.post("/api/career/recommendation", payload);
      console.log(res.data)
      return res.data;
      

    
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
