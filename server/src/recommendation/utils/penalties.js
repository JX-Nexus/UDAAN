// penalties.js
// ===============================================================
// ⚖️ Career Confidence Penalty Engine
// ---------------------------------------------------------------
// Applies deductions when traits conflict with role requirements.
// Includes contextual exceptions for structured creativity & hybrids.
// ===============================================================

export function applyPenalties(
  SkillLevel,
  confidence,
  Interest,
  Aptitude,
  Personality,
  ValuesMotivation,
  reasons,
  careerName
) {
  // ================================
  // 💡 INNOVATION + CREATIVITY CONFLICTS
  // ================================

  // Low innovation penalty for high-innovation fields
  if (
    ValuesMotivation.Innovation < 3 &&
    ["AI", "Data", "Marketing", "Research"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 10;
    reasons.push(
      "Low innovation score → exploration-heavy fields like AI/Marketing are penalized."
    );
  }

  // 🆕 Exception: Structured creative fields shouldn’t be penalized for low innovation
  if (
    ValuesMotivation.Innovation < 3 &&
    Interest.Artistic > 4 &&
    Personality.StructurePreference > 4 &&
    ["Design", "Interior", "Product", "Architecture", "Graphics"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence += 5;
    reasons.push(
      "Low innovation offset by strong structured creativity → practical design focus rewarded."
    );
  }

  // Creativity + Structure conflict
  if (Interest.Artistic > 6 && Personality.StructurePreference > 6) {
    confidence -= 5;
    reasons.push(
      "Conflict between high creativity & strict structure preference may limit artistic flexibility."
    );
  }

  // ================================
  // 🧮 ANALYTICAL / NUMERICAL SKILL DEFICITS
  // ================================

  if (
    (Aptitude.NumericalAbility < 4 || Aptitude.LogicalReasoning < 4) &&
    ["AI", "Machine", "Data", "Engineer"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 7;
    reasons.push(
      "Lower numerical or logical reasoning reduces suitability for data-intensive or technical roles."
    );
  }

  // ================================
  // 🗣️ SOCIAL + COMMUNICATION DEFICITS
  // ================================

  if (
    (Interest.Social < 4 || Aptitude.Communication < 4) &&
    ["Teacher", "Psychologist", "Doctor", "Surgeon", "Manager"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 10;
    reasons.push(
      "Lower social or communication traits reduce fit for highly interactive roles."
    );
  }

  // ================================
  // 🔬 INVESTIGATIVE / RESEARCH DEFICITS
  // ================================

  if (
    Interest.Investigative < 3 &&
    ["AI", "Data", "Scientist", "Engineer"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 8;
    reasons.push(
      "Lower investigative curiosity may limit fit for research-heavy technical fields."
    );
  }

  // 🆕 Exception: creative-tech roles rely on applied problem-solving, not deep research
  if (
    Interest.Investigative < 3 &&
    Interest.Artistic > 4 &&
    SkillLevel?.CreativeTools > 4 &&
    ["Design", "Product", "Architecture"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence += 4;
    reasons.push(
      "Low investigative curiosity compensated by strong creative problem-solving ability."
    );
  }

  // ================================
  // 🕐 TIME MANAGEMENT / STABILITY ISSUES
  // ================================

  if (
    Aptitude.TimeManagement < 4 &&
    ["Doctor", "Surgeon"].some((kw) => careerName.includes(kw))
  ) {
    confidence -= 6;
    reasons.push(
      "Weak time management skills can impact high-pressure roles like surgery or emergency care."
    );
  }

  if (
    Personality.EmotionalStability < 4 &&
    ["Doctor", "Psychologist", "Surgeon", "Nurse"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 8;
    reasons.push(
      "Lower emotional stability may make stress-heavy healthcare roles more challenging."
    );
  }

  // ================================
  // 💼 LEADERSHIP / EXECUTION GAPS
  // ================================

  if (
    Interest.Enterprising < 4 &&
    ["Manager", "Entrepreneur", "Business", "Civil Services"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 7;
    reasons.push(
      "Lower enterprising drive can limit performance in leadership or management roles."
    );
  }

  if (
    ValuesMotivation.Independence < 4 &&
    ["Entrepreneur", "Founder", "Freelancer", "Startup"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 5;
    reasons.push(
      "Low independence preference reduces comfort in unstructured entrepreneurial environments."
    );
  }

  // ================================
  // 🎨 ARTISTIC UNDERFIT (visual/creative roles)
  // ================================

  if (
    Interest.Artistic < 4 &&
    ["Design", "Fashion", "Media", "Film", "Graphics"].some((kw) =>
      careerName.includes(kw)
    )
  ) {
    confidence -= 6;
    reasons.push(
      "Lower artistic interest suggests limited fit for visual or creative media roles."
    );
  }

  // 🆕 Exception: if curiosity or creative tools are strong, reduce penalty
  if (
    Interest.Artistic < 4 &&
    (Personality.Curiosity > 5 || SkillLevel?.CreativeTools > 5) &&
    ["Design", "Graphics", "Animation"].some((kw) => careerName.includes(kw))
  ) {
    confidence += 3;
    reasons.push(
      "Creative curiosity compensates for lower artistic interest → adaptive designer mindset."
    );
  }

  // ================================
  // 🧭 FINAL CLAMPING
  // ================================
  if (confidence < 0) confidence = 0;

  return confidence;
}
