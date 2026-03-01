import "./SafeCallPanels.css";

interface CallSimulationPanelProps {
  scenarioName?: string;
  onBack?: () => void;
}

export default function CallSimulationPanel({ scenarioName, onBack }: CallSimulationPanelProps) {
  return (
    <div className="safe-call-panel">
      {onBack && (
        <button type="button" className="back-button-top" onClick={onBack}>
          ← Back
        </button>
      )}
      <h1>Call Simulation</h1>
      {scenarioName && <p className="subtitle">{scenarioName}</p>}

      <section className="call-section">
        <div className="call-section-title">
          <span className="bullet-you">•</span> You
        </div>
        <div className="live-transcript-card">
          <div className="live-transcript-label">LIVE TRANSCRIPT</div>
          &ldquo;There&apos;s a fire in my kitchen...&rdquo;
        </div>
        <div className="mic-button-wrap">
          <button type="button" className="nav-arrow-btn" aria-label="Previous">‹</button>
          <button type="button" className="mic-btn" aria-label="Microphone">🎤</button>
          <button type="button" className="nav-arrow-btn" aria-label="Next">›</button>
        </div>
      </section>

      <section className="call-section">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
          <div className="call-section-title">
            <span className="bullet-dispatch">•</span> Dispatcher
          </div>
          <button type="button" className="audio-btn">🔊 Audio</button>
        </div>
        <div className="chat-bubbles">
          <div className="chat-bubble dispatch">911, what&apos;s your emergency?</div>
          <div className="chat-bubble user">There&apos;s a fire in my kitchen!</div>
          <div className="chat-typing">What&apos;s your address? …</div>
        </div>
      </section>
    </div>
  );
}
