import type { Category } from "../data/mockScenarios";
import "./SafeCallPanels.css";

interface CategoryHubPanelProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

const ICON_MAP: Record<string, string> = {
  fire: "🔥",
  car: "🚗",
  medical: "🩺",
  home: "🏠",
  suspicious: "👤",
};

export default function CategoryHubPanel({ categories, onSelectCategory }: CategoryHubPanelProps) {
  return (
    <div className="safe-call-panel">
      <h1>Choose Scenario</h1>
      <p className="subtitle">Select your training.</p>
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="category-card"
            onClick={() => onSelectCategory(cat.id)}
          >
            <div className={`category-card-icon ${cat.accentColor}`}>
              {ICON_MAP[cat.accentColor] ?? "📋"}
            </div>
            <div className="category-card-body">
              <div className="category-card-name">{cat.name}</div>
              <div className="category-card-meta">
                <span className={`chip-difficulty chip-${(cat.scenarios[0]?.difficulty ?? "Beginner").toLowerCase()}`}>
                  {cat.scenarios[0]?.difficulty ?? "Beginner"}
                </span>
                <span>🕐 {cat.scenarios[0]?.timeEstimate ?? "3-5 min"}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
