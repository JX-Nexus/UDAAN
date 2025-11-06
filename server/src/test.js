import { app } from "./app.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateCareerRecommendations } from "./recommendation/career.engine.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", async (req, res) => {
  const rand = () => {
    const base = Math.random();
    if (base < 0.1) return 1 + Math.random();
    if (base < 0.4) return 3 + Math.random();
    if (base < 0.8) return 4 + Math.random();
    return 6 + Math.random() * 1;
  };

  const mockData = {
    Interest: {
      Realistic: rand(),
      Investigative: rand(),
      Artistic: rand(),
      Social: rand(),
      Enterprising: rand(),
      Conventional: rand(),
    },
    Aptitude: {
      LogicalReasoning: rand(),
      NumericalAbility: rand(),
      Creativity: rand(),
      Communication: rand(),
      TimeManagement: rand(),
    },
    SkillLevel: {
      TechnicalSkills: rand(),
      AnalyticalSkills: rand(),
      CreativeTools: rand(),
      BusinessKnowledge: rand(),
      PublicSpeaking: rand(),
    },
    Personality: {
      StructurePreference: rand(),
      SocialOrientation: rand(),
      EmotionalStability: rand(),
      PlanningStyle: rand(),
      Curiosity: rand(),
    },
    ValuesMotivation: {
      Security: rand(),
      SocialImpact: rand(),
      Recognition: rand(),
      Innovation: rand(),
      Independence: rand(),
    },
  };

  // ✅ FIX: wait for model output
  const result = await generateCareerRecommendations(mockData);

  const htmlFile = fs.readFileSync(
    path.join(__dirname, "../public/quiz.html"),
    "utf-8"
  );

  const rendered = htmlFile
    .replace("{{DATA}}", JSON.stringify(mockData))
    .replace("{{RESULTS}}", JSON.stringify(result));

  res.send(rendered);
});


app.listen( 8000, () => {
        console.log(`Server is running at : http://localhost:8000`);
    })
