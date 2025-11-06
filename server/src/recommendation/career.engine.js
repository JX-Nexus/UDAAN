// careerEngine.js
import * as tf from "@tensorflow/tfjs";
import { careers } from "../utils/const.js";
import { detectArchetype } from "./utils/archetypes.js";
import { applyBoosts } from "./utils/boost.js";
import { applyPenalties } from "./utils/penalties.js";
import { generateFeedback } from "./utils/feedback.js";

/**
 * Attempt to enable tfjs-node backend if available (much faster in Node).
 * This is optional — if it fails we continue with the pure JS backend.
 */
(async () => {
  try {
    // note: dynamic import so this module doesn't hard-fail if tfjs-node is not installed
    await import("@tensorflow/tfjs-node");
    // eslint-disable-next-line no-console
    console.log("tfjs-node backend enabled (performance boost).");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("tfjs-node not available — running on JS backend.");
  }
})();

/**
 * generateCareerRecommendations
 * - Main pipeline: archetype => weighted base scoring => modular boosts/penalties
 *   => TF similarity nudge => feedback generation
 *
 * Key tweak points (easy to change later):
 *  - weights object (in the WEIGHTING section)
 *  - nonlinear scaling function
 *  - correlations map
 *  - boost/penalty modules (external files)
 *  - TF nudge magnitude
 */
export async function generateCareerRecommendations(data) {
  if (!data) throw new Error("Missing input data");

  const {
    Interest = {},
    Aptitude = {},
    SkillLevel = {},
    Personality = {},
    ValuesMotivation = {},
  } = data;

  /* ===========================
     1) WEIGHTING & NONLINEAR SCALE
     =========================== */
  const weights = {
    Interest: 0.35,
    Aptitude: 0.25,
    SkillLevel: 0.15,
    Personality: 0.10,
    ValuesMotivation: 0.15,
  };

  // example adaptive tweak: if socially-impactful+practical, shift emphasis
  if ((ValuesMotivation.SocialImpact || 0) > 5 && (Interest.Realistic || 0) > 5) {
    weights.Interest = 0.4;
    weights.Aptitude = 0.2;
    weights.ValuesMotivation = 0.25;
    weights.Personality = 0.1;
    weights.SkillLevel = 0.05;
  }

  // Nonlinear scaling - amplifies high values
  const nonlinear = (x) => Math.pow((Number(x) || 0) / 7, 1.6) * 100;

  /* ===========================
     2) CROSS-CATEGORY CORRELATIONS
     (small adjustments to related traits)
     =========================== */
  const correlations = {
    Creativity: { Artistic: 0.9, Innovation: 0.8 },
    LogicalReasoning: { AnalyticalSkills: 0.7, PlanningStyle: 0.5 },
    Communication: { SocialOrientation: 0.8, Recognition: 0.6 },
    Independence: { Innovation: 0.7, Curiosity: 0.6 },
    Curiosity: { Innovation: 0.6, AnalyticalSkills: 0.4 },
  };

  const adjustedData = structuredClone(data);
  for (const [src, links] of Object.entries(correlations)) {
    const srcVal = Aptitude[src] || Personality[src] || ValuesMotivation[src] || 0;
    if (!srcVal) continue;
    for (const [target, factor] of Object.entries(links)) {
      for (const cat of Object.keys(adjustedData)) {
        if (adjustedData[cat]?.[target] !== undefined) {
          adjustedData[cat][target] =
            (adjustedData[cat][target] || 0) + srcVal * factor * 0.2;
        }
      }
    }
  }

  /* ===========================
     3) ARCHETYPE DETECTION (modular)
     =========================== */
  const { name, description, strengths } = detectArchetype(
    Interest,
    Aptitude,
    SkillLevel,
    Personality,
    ValuesMotivation
  );

  /* ===========================
     4) MAIN WEIGHTED SCORE CALCULATION
     - Uses weighted per-career traits (const careers should be the weighted format)
     - Tracks traitMatches to reward concentrated strength
     =========================== */
  const results = careers.map((career) => {
    let weightedSum = 0;
    let totalWeight = 0;

    // track how many specific trait fields matched and how strong they are
    let traitMatches = 0;
    let traitTotal = 0;

    // career.traits is expected in the weighted format:
    // { Interest: { Investigative: 0.8, Realistic: 0.4 }, Aptitude: { ... }, ... }
    for (const category of Object.keys(career.traits || {})) {
      const fields = career.traits[category] || {};
      let catSum = 0;
      let validCount = 0;

      // fields can be either an array (legacy) or an object (preferred weighted form)
      if (Array.isArray(fields)) {
        // backward compatibility: array of subfield names
        fields.forEach((subfield) => {
          const val = adjustedData[category]?.[subfield];
          if (val !== undefined && val !== null) {
            catSum += nonlinear(val);
            validCount++;
            traitTotal++;
            if (val > 6.5) traitMatches += 1.3;
            else if (val > 5.5) traitMatches += 1.0;
            else if (val > 4.5) traitMatches += 0.7;
            else if (val > 3.5) traitMatches += 0.4;
          }
        });

        if (validCount > 0) {
          const avg = catSum / validCount;
          weightedSum += avg * (weights[category] || 1);
          totalWeight += weights[category] || 1;
        }
      } else {
        // preferred weighted map: { subfieldName: weight, ... }
        for (const [subfield, importance] of Object.entries(fields)) {
          const val = adjustedData[category]?.[subfield];
          if (val !== undefined && val !== null) {
            const scaled = nonlinear(val) * (Number(importance) || 0.5); // multiply by trait importance
            catSum += scaled;
            validCount++;
            traitTotal++;
            if (val > 6.5) traitMatches += 1.3;
            else if (val > 5.5) traitMatches += 1.0;
            else if (val > 4.5) traitMatches += 0.7;
            else if (val > 3.5) traitMatches += 0.4;
          }
        }

        if (validCount > 0) {
          // average already incorporates per-trait importance
          const avg = catSum / validCount;
          weightedSum += avg * (weights[category] || 1);
          totalWeight += weights[category] || 1;
        }
      }
    }

    // alignment multiplier (how concentrated are the strong traits)
    const alignmentScore = traitTotal > 0 ? traitMatches / traitTotal : 0;
    let confidence = totalWeight > 0 ? weightedSum / totalWeight : 0;
    if (alignmentScore > 1) confidence *= 1.15;
    else if (alignmentScore > 0.8) confidence *= 1.05;
    else if (alignmentScore < 0.5) confidence *= 0.95;

    // explanation reasons collector
    const reasons = [];

    /* ===========================
       5) APPLY BOOSTS (module)
       Signature expected:
         applyBoosts(confidence, Interest, Aptitude, ValuesMotivation, Personality, SkillLevel, reasons, careerName)
       If your boost module differs, adapt it there.
       =========================== */
    try {
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
    } catch (e) {
      // don't crash recommendation if module has issues
      // eslint-disable-next-line no-console
      console.warn("applyBoosts failed:", e?.message || e);
    }
    confidence = Number.isFinite(confidence) ? confidence : 0;

    /* ===========================
       6) APPLY PENALTIES (module) — tolerant invocation
       Some penalty files use different argument orders. Try common ones.
       =========================== */
    try {
      const try1 = applyPenalties(
        confidence,
        Interest,
        Aptitude,
        Personality,
        ValuesMotivation,
        reasons,
        career.career
      );
      if (Number.isFinite(try1)) {
        confidence = try1;
      } else {
        // alternate signature seen in your repos
        const try2 = applyPenalties(
          SkillLevel,
          confidence,
          Interest,
          Aptitude,
          Personality,
          ValuesMotivation,
          reasons,
          career.career
        );
        if (Number.isFinite(try2)) confidence = try2;
      }
    } catch (err) {
      // try again with alternate signature inside catch
      try {
        const alt = applyPenalties(
          SkillLevel,
          confidence,
          Interest,
          Aptitude,
          Personality,
          ValuesMotivation,
          reasons,
          career.career
        );
        if (Number.isFinite(alt)) confidence = alt;
      } catch (err2) {
        // eslint-disable-next-line no-console
        console.warn("applyPenalties failed:", err?.message || err, err2?.message || err2);
      }
    }

    if (!Number.isFinite(confidence)) confidence = 0;

    /* ===========================
       7) CONTEXTUAL EXPLANATIONS & NORMALIZATIONS
       Add canned reasons and small domain-specific clamps
       =========================== */
    if (reasons.length === 0) {
      reasons.push("General trait alignment with aptitude & interest areas.");
    }

    if (career.career.includes("Psychology"))
      reasons.push("Curiosity and people-oriented traits fit behavioral fields.");
    if (career.career.includes("Data"))
      reasons.push("Curiosity + analytical aptitude align with data-driven careers.");
    if (career.career.includes("Marketing"))
      reasons.push("Creativity + communication support marketing and brand roles.");
    if (career.career.includes("Engineer"))
      reasons.push("Analytical and realistic interests align with engineering tasks.");
    if (career.career.includes("Design"))
      reasons.push("Blend of creativity and practical skills suits design fields.");
    if (career.career.includes("AI"))
      reasons.push("Analytical strengths fit applied AI; research needs investigative depth.");

    // domain-specific soft clamps
    if (career.career.includes("Entrepreneur") && (Interest.Enterprising || 0) < 5) confidence -= 5;
    if (career.career.includes("Historian") && (Interest.Investigative || 0) < 6) confidence -= 4;
    if (career.career.includes("Marketing") && (Aptitude.Communication || 0) < 5) confidence -= 3;

    confidence = Math.max(0, Math.min(100, Math.round(confidence)));

    return { ...career, confidence, reason: reasons.join(" ") };
  });

  /* ===========================
     8) TENSORFLOW COSINE SIMILARITY BOOST (safe & small nudge)
     - This is intentionally conservative (small additive nudge).
     - It uses tf.metrics.cosineProximity but guarded against shape mismatches.
     =========================== */
  const flattenData = [
    ...Object.values(Interest),
    ...Object.values(Aptitude),
    ...Object.values(SkillLevel),
    ...Object.values(Personality),
    ...Object.values(ValuesMotivation),
  ].map((v) => Number(v) || 0);

  const safeCosineSimilarity = (a, b) => {
    const len = Math.max(a.length, b.length);
    if (len === 0) return 0.5;
    const aPadded = [...a, ...Array(len - a.length).fill(0)];
    const bPadded = [...b, ...Array(len - b.length).fill(0)];
    try {
      const tA = tf.tensor1d(aPadded);
      const tB = tf.tensor1d(bPadded);
      let sim = tf.metrics.cosineProximity(tA, tB).arraySync();
      if (!Number.isFinite(sim)) sim = 0;
      // normalize -1..1 -> 0..1
      const normalized = (Math.max(-1, Math.min(1, sim)) + 1) / 2;
      return Number.isFinite(normalized) ? normalized : 0.5;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("safeCosineSimilarity failed:", e?.message || e);
      return 0.5;
    }
  };

  const aiBoosted = results.map((r) => {
    const idealValues = [];
    // Build ideal vector using career.traits weights (if available)
    for (const cat of Object.keys(r.traits || {})) {
      const fields = r.traits[cat] || {};
      if (Array.isArray(fields)) {
        // legacy array: push user's corresponding values in that order (may be sparse)
        fields.forEach((sub) => {
          idealValues.push(Number(Interest[sub] || Aptitude[sub] || SkillLevel[sub] || Personality[sub] || ValuesMotivation[sub] || 0));
        });
      } else {
        // weighted map: push user's value * importance to reflect ideal
        for (const [sub, importance] of Object.entries(fields)) {
          const userVal = Number(Interest[sub] || Aptitude[sub] || SkillLevel[sub] || Personality[sub] || ValuesMotivation[sub] || 0);
          idealValues.push(userVal * (Number(importance) || 0.5));
        }
      }
    }

    const similarity = safeCosineSimilarity(flattenData, idealValues);
    // small conservative nudge (0..6)
    let boosted = (r.confidence || 0) + similarity * 6;

    // soft push for excellent matches — keep < 99
    if (boosted > 90) boosted = 92 + (boosted - 90) * 0.5;
    boosted = Math.max(0, Math.min(99, Number.isFinite(boosted) ? boosted : 0));

    return {
      career: r.career,
      confidence: Math.round(boosted),
      reason: r.reason,
    };
  });

  /* ===========================
     9) FEEDBACK (modular)
     =========================== */
  const feedback = generateFeedback(Interest, Aptitude, SkillLevel, ValuesMotivation, Personality);

  /* ===========================
   9.5) CAREER CLUSTER SIMILARITY PROPAGATION
   - small ML-like layer that boosts similar careers
   - builds inter-career cosine matrix to share small confidence
   =========================== */
const expanded = [...aiBoosted];

// build small vector map for each career
const careerVectors = careers.map((c) => {
  const vec = [];
  for (const cat in c.traits) {
    const fields = c.traits[cat];
    if (Array.isArray(fields)) {
      fields.forEach((f) => vec.push(Number(data[cat]?.[f] || 0)));
    } else {
      for (const f in fields) vec.push(Number(data[cat]?.[f] || 0) * (fields[f] || 0.5));
    }
  }
  return vec;
});

// precompute similarities
for (let i = 0; i < expanded.length; i++) {
  let boost = 0;
  for (let j = 0; j < expanded.length; j++) {
    if (i === j) continue;
    const sim = safeCosineSimilarity(careerVectors[i], careerVectors[j]);
    if (sim > 0.85) boost += expanded[j].confidence * (sim - 0.8) * 0.15;
  }
  expanded[i].confidence = Math.min(99, expanded[i].confidence + boost);
}


















  /* ===========================
     10) FINAL OUTPUT (top 3)
     - also ensure we do not artificially inflate everything:
       we apply a mild scaling for top scores only (keeps realism).
     =========================== */
  // sort & pick top 3
  const recommendations = aiBoosted.sort((a, b) => b.confidence - a.confidence).slice(0, 3);

  // mild smart scaling (pull strong matches upward a bit without lying)
  aiBoosted.forEach((r) => {
    if (r.confidence > 75) {
      r.confidence = Math.round(85 + (r.confidence - 75) * 1.2);
      if (r.confidence > 99) r.confidence = 99;
    }
  });

  return {
    success: true,
    archetype: { name, description, strengths },
    recommendations,
    feedback,
  };
}
