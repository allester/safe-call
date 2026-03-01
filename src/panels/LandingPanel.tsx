import "./SafeCallPanels.css";

interface LandingPanelProps {
  onStartTraining: () => void;
}

export default function LandingPanel({ onStartTraining }: LandingPanelProps) {
  return (
    <div className="safe-call-panel">
      <div className="landing-logo" aria-hidden>
        📞
      </div>
      <h1 className="landing-title">SafeCall VR</h1>
      <p className="landing-tagline">Emergency call training for kids in immersive VR</p>
      <button type="button" className="btn-start-training" onClick={onStartTraining}>
        Start Training
      </button>
    </div>
  );
}
