import { useState, useCallback, useRef, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import type { MessagePayload } from "@elevenlabs/types";
import "./SafeCallPanels.css";

const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID ?? "";

export interface TranscriptEntry {
  id: string;
  role: "user" | "agent";
  message: string;
  eventId?: number;
}

interface ElevenLabsAgentPanelProps {
  scenarioName?: string;
  scenarioContext?: string;
  onBack?: () => void;
}

export default function ElevenLabsAgentPanel({
  scenarioName,
  scenarioContext,
  onBack,
}: ElevenLabsAgentPanelProps) {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [micPermissionError, setMicPermissionError] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(0);

  const handleMessage = useCallback((payload: MessagePayload) => {
    const entry: TranscriptEntry = {
      id: `msg-${idCounterRef.current++}-${payload.event_id ?? Date.now()}`,
      role: payload.role === "agent" ? "agent" : "user",
      message: payload.message,
      eventId: payload.event_id,
    };
    setTranscript((prev) => [...prev, entry]);
  }, []);

  const {
    startSession,
    endSession,
    status,
    isSpeaking,
    canSendFeedback,
    sendFeedback,
  } = useConversation({
    onMessage: handleMessage,
    onConnect: () => setError(null),
    onDisconnect: () => setError(null),
    onError: (msg) => setError(msg),
  });

  const scrollToBottom = useCallback(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [transcript, scrollToBottom]);

  const handleStartSession = async () => {
    if (!AGENT_ID) {
      setError("Agent ID not configured. Set VITE_ELEVENLABS_AGENT_ID in .env");
      return;
    }
    setError(null);
    setMicPermissionError(false);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setMicPermissionError(true);
      setError("Microphone access denied. Please allow microphone and try again.");
      return;
    }
    try {
      setTranscript([]);
      await startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
        ...(scenarioContext && {
          overrides: {
            agent: {
              prompt: { prompt: scenarioContext },
            },
          },
        }),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect");
    }
  };

  const handleEndSession = async () => {
    try {
      await endSession();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disconnect");
    }
  };

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <div className="safe-call-panel">
      {onBack && (
        <button type="button" className="back-button-top" onClick={onBack}>
          ← Back
        </button>
      )}
      <h1>Voice AI Call</h1>
      {scenarioName && <p className="subtitle">{scenarioName}</p>}

      {!AGENT_ID && (
        <div
          className="live-transcript-card"
          style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            color: "#92400e",
          }}
        >
          <div className="live-transcript-label">Configuration required</div>
          Add <code>VITE_ELEVENLABS_AGENT_ID=your-agent-id</code> to your .env
          file. Get your agent ID from the ElevenLabs Conversational AI dashboard.
        </div>
      )}

      {error && (
        <div
          className="live-transcript-card"
          style={{
            background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
            color: "#b91c1c",
          }}
        >
          <div className="live-transcript-label">Error</div>
          {error}
        </div>
      )}

      {micPermissionError && (
        <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 12 }}>
          Enable microphone access in your browser and refresh, or click &quot;Start
          Call&quot; again.
        </p>
      )}

      <section className="call-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <div className="call-section-title">
            <span className="bullet-dispatch">•</span> Live Transcript
          </div>
          {isConnected && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: isSpeaking ? "#059669" : "#2563eb",
              }}
            >
              {isSpeaking ? "Agent speaking…" : "Listening…"}
            </span>
          )}
        </div>
        <div
          className="chat-bubbles"
          style={{
            maxHeight: 280,
            overflowY: "auto",
            padding: "4px 0",
          }}
        >
          {transcript.length === 0 && !isConnecting && !isConnected && (
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", padding: 12 }}>
              Start the call to begin the conversation. Your speech and the
              agent&apos;s replies will appear here.
            </p>
          )}
          {isConnecting && (
            <div className="chat-typing">Connecting to agent…</div>
          )}
          {transcript.map((entry) => (
            <div
              key={entry.id}
              className={`chat-bubble ${
                entry.role === "user" ? "user" : "dispatch"
              }`}
            >
              {entry.message}
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>

        <div className="mic-button-wrap">
          {!isConnected ? (
            <button
              type="button"
              className="mic-btn"
              onClick={handleStartSession}
              disabled={isConnecting || !AGENT_ID}
              aria-label="Start call"
            >
              {isConnecting ? "…" : "🎤"}
            </button>
          ) : (
            <>
              {canSendFeedback && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    className="nav-arrow-btn"
                    onClick={() => sendFeedback(true)}
                    aria-label="Positive feedback"
                    title="Good response"
                  >
                    👍
                  </button>
                  <button
                    type="button"
                    className="nav-arrow-btn"
                    onClick={() => sendFeedback(false)}
                    aria-label="Negative feedback"
                    title="Poor response"
                  >
                    👎
                  </button>
                </div>
              )}
              <button
                type="button"
                className="mic-btn"
                onClick={handleEndSession}
                aria-label="End call"
                style={{
                  background:
                    "linear-gradient(135deg, #dc2626, #ef4444)",
                }}
              >
                End call
              </button>
            </>
          )}
        </div>
      </section>

      <p
        style={{
          fontSize: "0.7rem",
          color: "#94a3b8",
          marginTop: 12,
        }}
      >
        Enable &quot;Client events&quot; in your agent&apos;s Advanced settings for live
        transcripts.
      </p>
    </div>
  );
}
