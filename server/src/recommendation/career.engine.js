// careerEngine.js
import * as tf from "@tensorflow/tfjs";
import { careers } from "../utils/const.js";
import { detectArchetype } from "./utils/archetypes.js";
import { applyBoosts } from "./utils/boost.js";
import { applyPenalties } from "./utils/penalties.js";
import { generateFeedback } from "./utils/feedback.js";

export async function generateCareerRecommendations(data) {
  if (!data) throw new Error("Missing input data");

  const {
    Interest = {},
    Aptitude = {},
    SkillLevel = {},
    Personality = {},
    ValuesMotivation = {},
  } = data;

  /* 
  ============================================
  🧩 1️⃣ WEIGHTING (Influence of each category)
  ============================================
  */
  const weights = {
    Interest: 0.35,
    Aptitude: 0.25,
    SkillLevel: 0.15,
    Personality: 0.10,
    ValuesMotivation: 0.15,
  };

  // Nonlinear scaling (6–7 has much more impact than 2–3)
  const nonlinear = (x) => Math.pow(x / 7, 1.6) * 100;

  /* 
  ==============================================
  🧠 2️⃣ CROSS-CATEGORY CORRELATIONS (Trait Links)
  ==============================================
  */
  const correlations = {
    Creativity: { Artistic: 0.9, Innovation: 0.8 },
    LogicalReasoning: { AnalyticalSkills: 0.7, PlanningStyle: 0.5 },
    Communication: { SocialOrientation: 0.8, Recognition: 0.6 },
    Independence: { Innovation: 0.7, Curiosity: 0.6 },
    Curiosity: { Innovation: 0.6, AnalyticalSkills: 0.4 },
  };

  const adjustedData = structuredClone(data);
  for (const [src, links] of Object.entries(correlations)) {
    const srcVal =
      Aptitude[src] || Personality[src] || ValuesMotivation[src] || 0;
    if (srcVal) {
      for (const [target, factor] of Object.entries(links)) {
        for (const cat in adjustedData) {
          if (adjustedData[cat][target] !== undefined) {
            adjustedData[cat][target] += srcVal * factor * 0.2;
          }
        }
      }
    }
  }

  /* 
  =====================================================
  🧬 3️⃣ ARCHETYPE CLASSIFICATION (Psychological Profile)
  =====================================================
  */
  const { name, description, strengths } = detectArchetype(
    Interest,
    Aptitude,
    SkillLevel,
    Personality,
    ValuesMotivation
  );
  const activeArchetype = name;

  /* 
  ==============================================
  ⚙️ 4️⃣ WEIGHTED SCORE CALCULATION (Main Engine)
  ==============================================
  */
  const results = careers.map((career) => {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const category in career.traits) {
      const fields = career.traits[category];
      let catSum = 0;
      let validCount = 0;

      fields.forEach((subfield) => {
        const val = adjustedData[category]?.[subfield];
        if (val !== undefined && val !== null) {
          catSum += nonlinear(val);
          validCount++;
        }
      });

      if (validCount > 0) {
        const avg = catSum / validCount;
        weightedSum += avg * (weights[category] || 1);
        totalWeight += weights[category] || 1;
      }
    }

    let confidence = totalWeight > 0 ? weightedSum / totalWeight : 0;
    const reasons = [];

    /* 
    ====================================================
    🎯 5️⃣ BOOST + PENALTY LOGIC (External Modules)
    ====================================================
    */
    confidence = applyBoosts(
      confidence,
      Interest,
      Aptitude,
      ValuesMotivation,
      Personality,
      SkillLevel,
      reasons,
      career.career
    );

    confidence = applyPenalties(
      confidence,
      Interest,
      Aptitude,
      Personality,
      ValuesMotivation,
      reasons,
      SkillLevel,
      career.career
    );

    // --- Fallback & contextual reasons ---
    if (reasons.length === 0)
      reasons.push("General trait alignment with aptitude & interest areas.");

    if (career.career.includes("Psychology"))
      reasons.push("Strong curiosity and people-awareness match behavioral fields.");
    if (career.career.includes("Data"))
      reasons.push("High curiosity and innovation align with analytical, data-driven roles.");
    if (career.career.includes("Marketing"))
      reasons.push("Balanced creativity and communication enable success in marketing roles.");
    if (career.career.includes("Engineer"))
      reasons.push("Analytical and structured mindset fits technical problem-solving roles.");
    if (career.career.includes("Surgeon"))
      reasons.push("High emotional stability helps, but social and time management factors may limit fit.");
    if (career.career.includes("Design"))
      reasons.push("Blend of creativity and innovation aligns with design and visual roles.");
    if (career.career.includes("Frontend"))
      reasons.push("Strong technical and communication balance fits interface development.");
    if (career.career.includes("AI"))
      reasons.push("Analytical but less investigative; best suited for applied AI, not research.");
    // Normalize clusters
    if (career.career.includes("Entrepreneur") && Interest.Enterprising < 5) confidence -= 5;
    if (career.career.includes("Historian") && Interest.Investigative < 6) confidence -= 4;
    if (career.career.includes("Marketing") && Aptitude.Communication < 5) confidence -= 3;
    if (career.career.includes("Pharmacist") && Personality.PlanningStyle < 5) confidence -= 5;


    confidence = Math.max(0, Math.min(100, Math.round(confidence)));

    return { ...career, confidence, reason: reasons.join(" ") };
  });

  /* 
  ============================================
  🤖 6️⃣ TENSORFLOW COSINE SIMILARITY BOOST
  ============================================
  */
  const flattenData = [
    ...Object.values(Interest),
    ...Object.values(Aptitude),
    ...Object.values(SkillLevel),
    ...Object.values(Personality),
    ...Object.values(ValuesMotivation),
  ];

  const safeCosineSimilarity = (a, b) => {
    const len = Math.max(a.length, b.length);
    const aPadded = [...a, ...Array(len - a.length).fill(0)];
    const bPadded = [...b, ...Array(len - b.length).fill(0)];
    const tA = tf.tensor1d(aPadded);
    const tB = tf.tensor1d(bPadded);
    const sim = tf.metrics.cosineProximity(tA, tB).arraySync();
    return (sim + 1) / 2;
  };

  const aiBoosted = results.map((r) => {
    const idealValues = [];
    for (const cat in r.traits) {
      for (const sub of r.traits[cat]) {
        const v =
          Interest[sub] ||
          Aptitude[sub] ||
          SkillLevel[sub] ||
          Personality[sub] ||
          ValuesMotivation[sub] ||
          0;
        idealValues.push(v);
      }
    }

    const similarity = safeCosineSimilarity(flattenData, idealValues);
    const boosted = r.confidence + similarity * 6;
    return {
      career: r.career,
      confidence: Math.min(100, Math.round(boosted)),
      reason: r.reason,
    };
  });

  /*  
  =======================================
  🧭 7️⃣ FEEDBACK GENERATION (Modular)
  =======================================
  */
  const feedback = generateFeedback(Interest, Aptitude, SkillLevel, ValuesMotivation);

  /*  
  =======================================
  🏁 8️⃣ FINAL OUTPUT
  =======================================
  */
  const recommendations = aiBoosted
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  return {
    success: true,
    archetype: {
      name,
      description,
      strengths,
    },
    recommendations,
    feedback,
  };
}
