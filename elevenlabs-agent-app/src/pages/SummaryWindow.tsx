import { useEffect, useState } from 'react';
import { readSummary, DISPATCH_KEYS } from '../sync';
import { SummaryPanel } from '../components/SummaryPanel';

export default function SummaryWindow() {
  const [summary, setSummary] = useState(readSummary);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== DISPATCH_KEYS.summary || e.newValue == null) return;
      setSummary(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    const interval = setInterval(() => setSummary(readSummary()), 500);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-elevenlabs-dark text-white flex flex-col">
      <header className="window-drag-region flex-shrink-0 py-2 px-4 border-b border-elevenlabs-border bg-elevenlabs-card">
        <h1 className="text-base font-semibold text-white">Summary</h1>
      </header>
      <main className="flex-1 overflow-hidden p-4">
        <div className="h-full rounded-xl border border-elevenlabs-border p-4 bg-elevenlabs-card">
          <SummaryPanel summary={summary} />
        </div>
      </main>
    </div>
  );
}
