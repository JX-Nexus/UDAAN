// archetypes.js
// ===========================================================
// 🧠 Archetype Detection System
// -----------------------------------------------------------
// Determines the dominant personality + aptitude combination
// to classify users into meaningful psychological "archetypes"
// ===========================================================

export function detectArchetype(
  Interest,
  Aptitude,
  SkillLevel,
  Personality,
  ValuesMotivation
) {
  // --- Default Archetype ---
  let name = "Balanced Individual";
  let description =
    "A well-rounded personality with balanced strengths across creative, analytical, and social traits.";
  let strengths = ["Adaptable", "Balanced", "Curious"];

  // ===========================================================
  // 🧩 1️⃣ Primary Archetypes — Core single-trait personalities
  // ===========================================================
  if (Interest.Investigative > 5 && Aptitude.NumericalAbility > 5) {
    name = "Analytical Realist";
    description =
      "Logical, data-driven, and practical. Prefers structured problem-solving and evidence-based thinking.";
    strengths = ["Analytical", "Rational", "Practical"];
  } else if (
    Interest.Artistic > 5 &&
    (Aptitude.Creativity > 5 || ValuesMotivation.Innovation > 5)
  ) {
    name = "Creative Explorer";
    description =
      "Imaginative, expressive, and open to new experiences. Thrives in artistic and innovative fields.";
    strengths = ["Imaginative", "Creative", "Innovative"];
  } else if (
    Personality.PlanningStyle > 5 &&
    Personality.StructurePreference > 5
  ) {
    name = "Structured Thinker";
    description =
      "Organized and methodical, excels in planning and system-driven environments.";
    strengths = ["Disciplined", "Organized", "Reliable"];
  } else if (
    Interest.Social > 5 &&
    ValuesMotivation.SocialImpact > 5
  ) {
    name = "Empathic Helper";
    description =
      "Compassionate and people-oriented, motivated by helping and improving others’ lives.";
    strengths = ["Empathetic", "Supportive", "Sociable"];
  }

  // ===========================================================
  // 🧬 2️⃣ Hybrid Archetypes — Two or more combined dimensions
  // ===========================================================
  // These should override primaries if matched later
  // (placed after core archetypes intentionally)

  // 🔹 Empathetic + Curious
  if (Interest.Social > 5 && Interest.Investigative > 5) {
    name = "Social Investigative";
    description =
      "Blends curiosity with empathy — ideal for psychology, education, and public policy fields.";
    strengths = ["Inquisitive", "Empathetic", "Analytical"];
  }

  // 🔹 Creative + Communicative
  if (Interest.Artistic > 5 && Aptitude.Communication > 5) {
    name = "Creative Communicator";
    description =
      "Combines expressive creativity with clear communication — excels in media, marketing, or performing arts.";
    strengths = ["Expressive", "Charismatic", "Creative"];
  }

  // 🔹 Analytical + Innovative
  if (Interest.Investigative > 5 && ValuesMotivation.Innovation > 5) {
    name = "Structured Innovator";
    description =
      "A thinker who loves structured experimentation — ideal for AI, R&D, and product strategy roles.";
    strengths = ["Analytical", "Inventive", "Curious"];
  }

  // 🔹 Strategic + Innovative
  if (Personality.PlanningStyle > 5 && ValuesMotivation.Innovation > 5) {
    name = "Analytical Planner";
    description =
      "Strategic and forward-thinking, capable of planning and executing innovative ideas.";
    strengths = ["Strategic", "Planner", "Innovative"];
  }

  // 🔹 Logical + Conventional
  if (Interest.Investigative > 5 && Interest.Conventional > 5) {
    name = "Analytical Executor";
    description =
      "Practical and detail-oriented, able to combine logic with execution — thrives in analysis or operations.";
    strengths = ["Practical", "Systematic", "Focused"];
  }

  // 🔹 Artistic + Technical
  if (
    Interest.Artistic > 4 &&
    SkillLevel.TechnicalSkills > 5 &&
    ValuesMotivation.Innovation > 5
  ) {
    name = "Creative Technologist";
    description =
      "Blends creative intuition with technical mastery — excels in innovation, UI/UX, and digital design.";
    strengths = ["Creative", "Technical", "Innovative"];
  }

  // 🔹 Social + Enterprising
  if (Interest.Enterprising > 5 && Interest.Social > 5) {
    name = "Enterprising Social Leader";
    description =
      "Confident, persuasive, and inspiring — excels in leadership, management, and entrepreneurship.";
    strengths = ["Leadership", "Persuasive", "Driven"];
  }

  // 🔹 Business + Innovation + Social Impact
  if (
    Interest.Enterprising > 6 &&
    ValuesMotivation.SocialImpact > 6 &&
    ValuesMotivation.Innovation > 5
  ) {
    name = "Enterprising Innovator";
    description =
      "Driven, visionary, and socially conscious leader who blends business acumen with innovation.";
    strengths = ["Leadership", "Vision", "Social Impact", "Analytical Thinking"];
  }

  // 🔹 Structured + Artistic + Social
  if (
    Personality.StructurePreference > 6 &&
    Interest.Artistic > 4 &&
    Interest.Social > 5
  ) {
    name = "Organized Creator";
    description =
      "A disciplined yet expressive individual who thrives when creativity meets structure. Prefers collaborative and visually engaging work.";
    strengths = ["Creativity", "Teamwork", "Discipline"];
  }
  if (Interest.Realistic > 5 && Interest.Artistic > 4 && Personality.Curiosity > 6) {
  name = "Creative Realist";
  description = "Grounded and curious, skilled at applying creativity to practical, real-world design. Prefers functional beauty and order.";
  strengths = ["Practical Creativity", "Curiosity", "Visual Thinking"];
}


  // ===========================================================
  // ✅ Return Structured Archetype Object
  // ===========================================================
  return { name, description, strengths };
}
