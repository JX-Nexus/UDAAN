// feedback.js (improved)
export function generateFeedback(Interest, Aptitude, SkillLevel, ValuesMotivation) {
  const feedback = [];

  if (Interest.Investigative < 4)
    feedback.push("Explore deeper problem-solving or research-based projects to strengthen analytical balance.");

  if (SkillLevel.CreativeTools < 5)
    feedback.push("Develop better creative tool mastery (Figma, Blender, Canva) to enhance artistic precision.");

  if (Aptitude.Communication < 5)
    feedback.push("Sharpen communication and articulation to expand leadership and collaboration opportunities.");

  if (ValuesMotivation.Innovation < 4.5)
    feedback.push("Engage in creative experimentation or side projects to improve innovation confidence.");

  if (ValuesMotivation.Independence < 3)
    feedback.push("Try small personal projects to build comfort with independent decision-making.");

  if (Aptitude.Communication < 4)
  feedback.push("Improve communication — your ideas are strong but may not reach their full impact without expression.");

  return feedback;
}
