import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/index.js";
import { generateCareerRecommendations } from "../recommendation/career.engine.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { careerData } from "../utils/careerData.js";
import { Careers, Courses, CourseOfferings,CareerCourseMap  } from "../schema/index.js";
import { eq, inArray } from "drizzle-orm";

const careerRecommendation = asyncHandler(async (rdb, res, next) => {
 
    const { quizAnswers, processedData } = rdb.body;

    if (!processedData) {
      throw new ApiError(400, "Missing processedData payload");
    }

    console.log("✅ Received quiz data");
    console.log("\n",quizAnswers,"\n")
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
    // await eq.recommendations.create({ userId: rdb.user?.id, data: enrichedRecommendations });
    console.log(
       "archetype", archetype,
          "recommendations", enrichedRecommendations,
          "feedback", feedback)
    
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

const getCareer = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) throw new ApiError(400, "Career slug is rdbuired");

  // 1️⃣ Fetch career
  const career = await eq.query.Careers.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });

  if (!career) throw new ApiError(404, "Career not found");

  // 2️⃣ Get mapped courses for this career
  const mappedCourses = await eq
    .select({
      map: CareerCourseMap,
      course: Courses,
    })
    .from(CareerCourseMap)
    .leftJoin(Courses, eq(CareerCourseMap.courseId, Courses.id))
    .where(eq(CareerCourseMap.careerId, career.id));

  const courses = mappedCourses
    .map((row) => row.course)
    .filter(Boolean);

  const courseIds = courses.map((c) => c.id);

  // 3️⃣ Get all college offerings for these courses
  let offerings = [];
  if (courseIds.length > 0) {
    offerings = await eq
      .select({
        offering: CourseOfferings,
        college: Colleges,
      })
      .from(CourseOfferings)
      .leftJoin(Colleges, eq(CourseOfferings.collegeId, Colleges.id))
      .where(inArray(CourseOfferings.courseId, courseIds));
  }

  // 4️⃣ Structure final response
  const response = {
    career,
    courses,
    colleges: offerings.map((row) => ({
      ...row.college,
      offering: row.offering,
    })),
  };

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Career details fetched successfully"));
});

export { 
  careerRecommendation,
  getCareer

};
