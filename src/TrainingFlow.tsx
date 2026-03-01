import { useState } from "react";
import { CATEGORIES, getCategory } from "./data/mockScenarios";
import type { Category, ScenarioOption } from "./data/mockScenarios";
import LandingPanel from "./panels/LandingPanel";
import PlaceholderPanel from "./panels/PlaceholderPanel";
import CategoryHubPanel from "./panels/CategoryHubPanel";
import CategoryDetailPanel from "./panels/CategoryDetailPanel";
import ScenarioInfoPanel from "./panels/ScenarioInfoPanel";
import CallSimulationPanel from "./panels/CallSimulationPanel";
import "./panels/SafeCallPanels.css";

type View =
  | "landing"
  | "categoryHub"
  | "categoryDetail"
  | "scenarioInfo"
  | "callSimulation";

export default function TrainingFlow() {
  const [showPlaceholderPanel, setShowPlaceholderPanel] = useState(true);
  const [view, setView] = useState<View>("landing");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioOption | null>(null);

  const category: Category | undefined =
    selectedCategoryId ? getCategory(selectedCategoryId) : undefined;

  const handleStartTraining = () => {
    setShowPlaceholderPanel(false);
    setView("categoryHub");
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setView("categoryDetail");
  };

  const handleSelectScenario = (scenario: ScenarioOption) => {
    setSelectedScenario(scenario);
    setView("scenarioInfo");
  };

  const handleStartScenario = () => setView("callSimulation");
  const handleBackToCategoryDetail = () => setView("categoryDetail");
  const handleBackToCategoryHub = () => {
    setSelectedCategoryId(null);
    setSelectedScenario(null);
    setView("categoryHub");
  };
  const handleBackFromCall = () => setView("scenarioInfo");

  const isTwoPanel = view === "landing" && showPlaceholderPanel;

  return (
    <div
      className="training-flow"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1e293b 0%, #334155 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: isTwoPanel ? 900 : 480,
        }}
      >
        {view === "landing" && (
          <LandingPanel onStartTraining={handleStartTraining} />
        )}
        {view === "landing" && showPlaceholderPanel && <PlaceholderPanel />}

        {view === "categoryHub" && (
          <CategoryHubPanel
            categories={CATEGORIES}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {view === "categoryDetail" && category && (
          <CategoryDetailPanel
            category={category}
            onSelectScenario={handleSelectScenario}
            onBack={handleBackToCategoryHub}
          />
        )}

        {view === "scenarioInfo" && selectedScenario && (
          <ScenarioInfoPanel
            scenario={selectedScenario}
            onStartScenario={handleStartScenario}
            onBack={handleBackToCategoryDetail}
          />
        )}

        {view === "callSimulation" && (
          <CallSimulationPanel
            scenarioName={selectedScenario?.name}
            onBack={handleBackFromCall}
          />
        )}
      </div>
    </div>
  );
}
