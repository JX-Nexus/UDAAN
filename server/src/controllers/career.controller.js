import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/index.js";
import { generateCareerRecommendations } from "../recommendation/career.engine.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { careerData } from "../utils/careerData.js";

const careerRecommendation = asyncHandler(async (req, res, next) => {
 
    const { quizAnswers, processedData } = req.body;

    if (!processedData) {
      throw new ApiError(400, "Missing processedData payload");
    }

    console.log("✅ Received quiz data");
    console.log("processedData:", JSON.stringify(processedData, null, 2));

    // Run the recommendation engine
    const result = await generateCareerRecommendations(processedData);

    // support two possible shapes: result.output.* or result.* (backwards compatibility)
    const output = result?.output ?? result ?? {};
    const recommendations = Array.isArray(output.recommendations) ? output.recommendations : [];
    const feedback = Array.isArray(output.feedback) ? output.feedback : [];
    const archetype = output.archetype ?? output.archetype ?? {};

    // format frontend-friendly response by enriching recommendations
    const enrichedRecommendations = recommendations.map((rec) => {
      const recCareer = (rec.career || rec.title || "").toString();
      const candidateSlug = recCareer.replace(/\s+/g, "-").toLowerCase();

      // find corresponding entry from careerData (tolerant to missing fields)
      const matchedCareer = careerData.find((c) => {
        if (!c) return false;
        const title = (c.title || "").toString().toLowerCase();
        const slug = (c.slug || "").toString().toLowerCase();
        return title === recCareer.toLowerCase() || slug === candidateSlug;
      });
      const results = {
          icon: matchedCareer?.icon || "🎓",
        title: matchedCareer?.title || recCareer || "Unknown Career",
        slug:
          matchedCareer?.slug ||
          (recCareer ? recCareer.toLowerCase().replace(/\s+/g, "-") : "unknown"),
        type: matchedCareer?.type || rec.type || "Career",
        confidence: typeof rec.confidence === "number" ? rec.confidence : 0,
        description: rec.reason || rec.description || "Alignment-based recommendation",
        feedback,
        jobs: matchedCareer?.jobs || rec.jobs || [],
      }
      console.log(results)
      return {results};
    });

    // optional: save the generated recommendation logs (commented — enable if needed)
    // await db.recommendations.create({ userId: req.user?.id, data: enrichedRecommendations });

    // success response
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          archetype,
          recommendations: enrichedRecommendations,
          feedback,
        },
        "Career recommendations generated successfully ✅"
      )
    );
  
});

export { careerRecommendation };
