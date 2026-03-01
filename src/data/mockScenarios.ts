export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ScenarioOption {
  id: string;
  name: string;
  difficulty: Difficulty;
  timeEstimate: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  accentColor: string; // CSS color or gradient name for icon bar
  scenarios: ScenarioOption[];
}

export const CATEGORIES: Category[] = [
  {
    id: "fire",
    name: "Fire & Smoke",
    accentColor: "fire",
    scenarios: [
      { id: "fire-kitchen", name: "Kitchen Fire", difficulty: "Beginner", timeEstimate: "3-5 min", description: "Practice reporting a small kitchen fire and following dispatcher instructions to stay safe." },
      { id: "fire-smoke", name: "Smoke in Building", difficulty: "Intermediate", timeEstimate: "5-7 min", description: "Learn how to report smoke and evacuate safely with 911 guidance." },
    ],
  },
  {
    id: "car",
    name: "Car / Road Accident",
    accentColor: "car",
    scenarios: [
      { id: "car-collision", name: "Car Collision", difficulty: "Beginner", timeEstimate: "3-5 min", description: "Report a car accident and share location and injuries with the dispatcher." },
      { id: "car-stranded", name: "Stranded on Road", difficulty: "Intermediate", timeEstimate: "4-6 min", description: "Practice calling when your car is stuck or broken down in an unsafe place." },
    ],
  },
  {
    id: "medical",
    name: "Medical Emergency",
    accentColor: "medical",
    scenarios: [
      { id: "med-choking", name: "Choking", difficulty: "Beginner", timeEstimate: "3-5 min", description: "Simulate reporting someone who is choking and get step-by-step help." },
      { id: "med-seizure", name: "Seizure", difficulty: "Intermediate", timeEstimate: "4-6 min", description: "Practice reporting a person having a seizure and keeping them safe." },
      { id: "med-heart", name: "Heart Attack", difficulty: "Advanced", timeEstimate: "5-7 min", description: "Learn how to describe symptoms and perform CPR guidance from 911." },
      { id: "med-allergic", name: "Allergic Reaction", difficulty: "Beginner", timeEstimate: "3-5 min", description: "Report a severe allergic reaction and get emergency response instructions." },
      { id: "med-fainting", name: "Fainting", difficulty: "Beginner", timeEstimate: "3-4 min", description: "Practice reporting someone who has fainted and what to do next." },
    ],
  },
  {
    id: "home",
    name: "Home Injury",
    accentColor: "home",
    scenarios: [
      { id: "home-cut", name: "Serious Cut", difficulty: "Beginner", timeEstimate: "3-5 min", description: "Practice reporting a bleeding injury and applying first aid with 911." },
      { id: "home-fall", name: "Fall / Broken Bone", difficulty: "Intermediate", timeEstimate: "4-6 min", description: "Report a fall and possible broken bone; learn not to move the person." },
    ],
  },
  {
    id: "suspicious",
    name: "Suspicious Person",
    accentColor: "suspicious",
    scenarios: [
      { id: "sus-stranger", name: "Stranger at Door", difficulty: "Beginner", timeEstimate: "3-5 min", description: "Practice what to say to 911 when someone suspicious is at your door." },
    ],
  },
];

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getScenario(categoryId: string, scenarioId: string): ScenarioOption | undefined {
  const cat = getCategory(categoryId);
  return cat?.scenarios.find((s) => s.id === scenarioId);
}
