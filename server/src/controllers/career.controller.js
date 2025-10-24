import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/index.js";


const careerRecommendation = asyncHandler(async (req, res, next) => {
  
  try {
   let {quizAnswers, processedData} = req.body;
   console.log("quizAnswers:",quizAnswers,"\n","processedData:", processedData)

  } catch (err) {
    console.error("Recommendation Error:", err.message);
    if (err instanceof ApiError)
      return res.status(err.statusCode).json({ error: err.message });
    return res.status(500).json({ error: "Internal server error" });
  }
});

export {
    careerRecommendation,
}