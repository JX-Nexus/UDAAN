// boost.js
// ===============================================================
// 🚀 Career Confidence Boost Engine
// ---------------------------------------------------------------
// Adds positive scoring adjustments for synergistic traits.
// You can tweak values (+/- points) or add conditions to shape
// the psychological impact of combinations.
// ===============================================================

export function applyBoosts(
  confidence,
  Interest,
  Aptitude,
  ValuesMotivation,
  Personality,
  SkillLevel,
  reasons,
  careerName
) {
  // ================================
  // 🗣️ SOCIAL + COMMUNICATION BOOSTS
  // ================================

  if (Interest.Social > 5 && Aptitude.Communication > 5) {
    confidence += 3;
    reasons.push(
      "Strong social & communication skills → ideal for teaching, mentoring, or management roles."
    );
  }

  if (Interest.Social > 6 && ValuesMotivation.SocialImpact > 5) {
    confidence += 4;
    reasons.push(
      "High empathy and desire for impact → well-suited for counseling, healthcare, or social service roles."
    );
  }

  // ================================
  // 🎨 ARTISTIC + CREATIVE BOOSTS
  // ================================

  if (Interest.Artistic > 5 && Aptitude.Creativity > 5) {
    confidence += 4;
    reasons.push(
      "High artistic and creative synergy → great fit for design, animation, or media-oriented careers."
    );
  }

  if (SkillLevel.CreativeTools > 5 && ValuesMotivation.Innovation > 5) {
    confidence += 3;
    reasons.push(
      "Strong creative tool proficiency + innovation mindset → boosts creative tech and design fields."
    );
  }

  // 🆕 CREATIVE REALIST / STRUCTURED CREATIVITY BOOSTS
  if (
    Interest.Realistic > 5 &&
    Interest.Artistic > 4 &&
    Aptitude.Creativity > 4
  ) {
    confidence += 5;
    reasons.push(
      "Strong practical and artistic synergy → ideal for Interior, Product, or UX Design careers."
    );
  }

  if (
    Personality.StructurePreference > 4 &&
    Interest.Artistic > 4 &&
    ValuesMotivation.Security > 5
  ) {
    confidence += 4;
    reasons.push(
      "Prefers structured creativity → thrives in stable, process-driven design and visual work."
    );
  }

  if (
    SkillLevel.BusinessKnowledge > 5 &&
    Interest.Artistic > 4 &&
    Aptitude.Creativity > 4
  ) {
    confidence += 3;
    reasons.push(
      "Strong business awareness complements creative ability → ideal for commercial design and branding."
    );
  }

  // ================================
  // 🔬 ANALYTICAL + TECHNICAL BOOSTS
  // ================================

  if (Interest.Realistic > 5 && Aptitude.NumericalAbility > 5) {
    confidence += 3;
    reasons.push(
      "Strong practical and numerical traits → excellent fit for engineering, tech, or scientific work."
    );
  }

  if (Interest.Investigative > 5 && Aptitude.LogicalReasoning > 5) {
    confidence += 4;
    reasons.push(
      "High investigative curiosity and logical reasoning → perfect for research and analytical careers."
    );
  }

  if (SkillLevel.TechnicalSkills > 5 && SkillLevel.AnalyticalSkills > 5) {
    confidence += 3;
    reasons.push(
      "Strong technical and analytical balance → ideal for data science, AI, and engineering paths."
    );
  }

  // ================================
  // 💡 INNOVATION + CURIOSITY BOOSTS
  // ================================

  if (Personality.Curiosity > 6 && ValuesMotivation.Innovation > 5) {
    confidence += 3;
    reasons.push(
      "Curious and innovation-driven mindset → strong potential for research and product development fields."
    );
  }

  if (ValuesMotivation.Independence > 6 && ValuesMotivation.Innovation > 5) {
    confidence += 2;
    reasons.push(
      "High independence and innovation → suitable for entrepreneurial and creative leadership roles."
    );
  }

  // 🆕 BONUS for applied curiosity (non-research creative types)
  if (
    Personality.Curiosity > 6 &&
    ValuesMotivation.Innovation < 4 &&
    Interest.Artistic > 4
  ) {
    confidence += 3;
    reasons.push(
      "Curious and expressive, even without strong innovation drive → excels in adaptive, visually creative work."
    );
  }

  // ================================
  // 💼 LEADERSHIP + STRATEGY BOOSTS
  // ================================

  if (Interest.Enterprising > 5 && Aptitude.Communication > 5) {
    confidence += 4;
    reasons.push(
      "Strong leadership and persuasion skills → excellent for business, management, or public-facing careers."
    );
  }

  if (ValuesMotivation.Recognition > 6 && ValuesMotivation.Independence > 6) {
    confidence += 3;
    reasons.push(
      "Driven by recognition and freedom → strong match for entrepreneurship or executive roles."
    );
  }

  // ================================
  // 🧠 STRUCTURE + EXECUTION BOOSTS
  // ================================

  if (Personality.PlanningStyle > 5 && Personality.StructurePreference > 5) {
    confidence += 3;
    reasons.push(
      "Excellent organization and structure preference → ideal for project management and coordination roles."
    );
  }

  if (Aptitude.TimeManagement > 5 && Aptitude.LogicalReasoning > 5) {
    confidence += 2;
    reasons.push(
      "Strong planning and logic combination → boosts performance in operations and engineering fields."
    );
  }

  // ================================
  // 🏆 MISCELLANEOUS SYNERGIES
  // ================================

  if (Interest.Social > 6 && ValuesMotivation.Recognition > 6) {
    confidence += 2;
    reasons.push(
      "People-oriented and recognition-driven → great fit for performance, entertainment, or leadership roles."
    );
  }

  if (SkillLevel.BusinessKnowledge > 5 && Aptitude.Communication > 5) {
    confidence += 3;
    reasons.push(
      "Strong business sense and communication → enhances success in marketing, consulting, and management roles."
    );
  }

  // ================================
  // 🔒 FINAL CLAMPING
  // ================================
  if (confidence > 85) confidence = 85 + (confidence - 85) * 0.3;
const totalBoosts = reasons.filter(r => r.includes("→")).length;
if (totalBoosts > 5) {
  confidence -= (totalBoosts - 5) * 2; 
  reasons.push("Balanced excessive synergy — too many overlapping strengths slightly normalized.");
}

  return confidence;
}
