import type { Category, ScenarioOption } from "../data/mockScenarios";
import "./SafeCallPanels.css";

interface CategoryDetailPanelProps {
  category: Category;
  onSelectScenario: (scenario: ScenarioOption) => void;
  onBack: () => void;
}

function difficultyClass(d: string): string {
  const k = d.toLowerCase();
  if (k === "beginner") return "chip-beginner";
  if (k === "intermediate") return "chip-intermediate";
  return "chip-advanced";
}

export default function CategoryDetailPanel({
  category,
  onSelectScenario,
  onBack,
}: CategoryDetailPanelProps) {
  return (
    <div className="safe-call-panel">
      <button type="button" className="back-button-top" onClick={onBack}>
        ← Back
      </button>
      <h1>{category.name}</h1>
      <p className="subtitle">Pick a scenario</p>
      <div className="scenario-list">
        {category.scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className="scenario-option-card"
            onClick={() => onSelectScenario(s)}
          >
            <span className="scenario-option-name">{s.name}</span>
            <div className="scenario-option-meta">
              <span className={`chip-difficulty ${difficultyClass(s.difficulty)}`}>
                {s.difficulty}
              </span>
              <span>🕐 {s.timeEstimate}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
