import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/index.js";
import { generateCareerRecommendations } from "../recommendation/career.engine.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { careerData } from "../utils/careerData.js";

const careerRecommendation = asyncHandler(async (req, res, next) => {
  try {
    const { quizAnswers, processedData } = req.body;

    if (!processedData) {
      throw new ApiError(400, "Missing processedData payload");
    }

    console.log("✅ Received quiz data");
    console.log("processedData:", JSON.stringify(processedData, null, 2));

    // Run the recommendation engine
    const result = await generateCareerRecommendations(processedData);

    // destructure recommendation output
    const { recommendations = [], feedback = [], archetype } = result.output || {};

    // format frontend-friendly response by enriching recommendations
    const enrichedRecommendations = recommendations.map((rec) => {
      // find corresponding entry from careerData
      const matchedCareer = careerData.find(
        (c) =>
          c.title.toLowerCase() === rec.career.toLowerCase() ||
          c.slug.toLowerCase() === rec.career.replace(/\s+/g, "-").toLowerCase()
      );

      return {
        icon: matchedCareer?.icon || "🎓",
        title: matchedCareer?.title || rec.career,
        slug: matchedCareer?.slug || rec.career.toLowerCase().replace(/\s+/g, "-"),
        type: matchedCareer?.type || "Career",
        confidence: rec.confidence || 0,
        description: matchedCareer?.description || "from backend",
        reason: rec.reason || "from backend",
        feedback: feedback || [],
        jobs: matchedCareer?.jobs || []
      };
    });

    // optional: save the generated recommendation logs
    // await db.recommendations.create({ userId: req.user?.id, data: enrichedRecommendations });
    console.log(enrichedRecommendationsgit add .
    )
    return res.status(201).json(
      new ApiResponse(201, {
        archetype: archetype || {},
        recommendations: enrichedRecommendations,
        feedback: feedback || []
      }, "Career recommendations generated successfully ✅")
    );
  } catch (err) {
    console.error("❌ Recommendation Error:", err.message);

    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
});

export { careerRecommendation };
