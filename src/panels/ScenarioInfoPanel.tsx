import type { ScenarioOption } from "../data/mockScenarios";
import "./SafeCallPanels.css";

interface ScenarioInfoPanelProps {
  scenario: ScenarioOption;
  onStartScenario: () => void;
  onBack: () => void;
}

function difficultyClass(d: string): string {
  const k = d.toLowerCase();
  if (k === "beginner") return "chip-beginner";
  if (k === "intermediate") return "chip-intermediate";
  return "chip-advanced";
}

export default function ScenarioInfoPanel({
  scenario,
  onStartScenario,
  onBack,
}: ScenarioInfoPanelProps) {
  return (
    <div className="safe-call-panel">
      <button type="button" className="back-button-top" onClick={onBack}>
        ← Back
      </button>
      <h1>{scenario.name}</h1>
      <p className="scenario-info-desc">{scenario.description}</p>
      <div className="scenario-info-chips">
        <span className={`chip-difficulty ${difficultyClass(scenario.difficulty)}`}>
          {scenario.difficulty}
        </span>
        <span className="chip-difficulty" style={{ background: "#e0e7ff", color: "#3730a3" }}>
          🕐 {scenario.timeEstimate}
        </span>
      </div>
      <div className="btn-group">
        <button type="button" className="btn-start-training" onClick={onStartScenario}>
          Start Scenario
        </button>
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
