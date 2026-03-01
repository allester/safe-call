import { useEffect, useState } from 'react';
import { readTranscript, DISPATCH_KEYS, type TranscriptMessageSync } from '../sync';
import { TranscriptPanel } from '../components/TranscriptPanel';

function toMessage(m: TranscriptMessageSync): { id: string; role: 'user' | 'assistant'; content: string; timestamp?: Date } {
  return {
    id: m.id,
    role: m.role,
    content: m.content,
    timestamp: m.timestamp ? new Date(m.timestamp) : undefined,
  };
}

export default function TranscriptWindow() {
  const [messages, setMessages] = useState(() => readTranscript().map(toMessage));

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== DISPATCH_KEYS.transcript || e.newValue == null) return;
      try {
        const data = JSON.parse(e.newValue);
        setMessages(Array.isArray(data) ? data.map((m: TranscriptMessageSync) => toMessage(m)) : []);
      } catch {
        setMessages([]);
      }
    };
    window.addEventListener('storage', onStorage);
    const interval = setInterval(() => setMessages(readTranscript().map((m) => toMessage(m))), 500);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-elevenlabs-dark text-white flex flex-col">
      <header className="window-drag-region flex-shrink-0 py-2 px-4 border-b border-elevenlabs-border bg-elevenlabs-card">
        <h1 className="text-base font-semibold text-white">Transcript</h1>
      </header>
      <main className="flex-1 overflow-hidden p-4">
        <div className="h-full rounded-xl border border-elevenlabs-border p-4 bg-elevenlabs-card">
          <TranscriptPanel messages={messages} />
        </div>
      </main>
    </div>
  );
}
