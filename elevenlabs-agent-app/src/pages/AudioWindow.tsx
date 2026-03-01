import { useEffect, useState } from 'react';
import { readMic, DISPATCH_KEYS } from '../sync';

export default function AudioWindow() {
  const [mic, setMic] = useState(readMic);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== DISPATCH_KEYS.mic || e.newValue == null) return;
      try {
        const data = JSON.parse(e.newValue);
        setMic({
          isActive: Boolean(data?.isActive),
          inputLevel: Number(data?.inputLevel) || 0,
          outputLevel: Number(data?.outputLevel) || 0,
        });
      } catch {
        setMic({ isActive: false, inputLevel: 0, outputLevel: 0 });
      }
    };
    window.addEventListener('storage', onStorage);
    const interval = setInterval(() => setMic(readMic()), 200);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-elevenlabs-dark text-white flex flex-col">
      <header className="window-drag-region flex-shrink-0 py-2 px-4 border-b border-elevenlabs-border bg-elevenlabs-card">
        <h1 className="text-base font-semibold text-white">Audio</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 flex flex-col gap-4">
        <div className="rounded-xl border border-elevenlabs-border p-4 bg-elevenlabs-card">
          <p className="text-sm text-elevenlabs-muted mb-3">
            {mic.isActive ? 'Live from main window' : 'Start a call in the main window for levels'}
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-elevenlabs-muted mb-1">Microphone</p>
              <div className="h-4 rounded-lg bg-elevenlabs-dark overflow-hidden">
                <div
                  className="h-full bg-elevenlabs-accent transition-all duration-100"
                  style={{ width: `${Math.min(100, mic.inputLevel * 100)}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-elevenlabs-muted mb-1">Agent</p>
              <div className="h-4 rounded-lg bg-elevenlabs-dark overflow-hidden">
                <div
                  className="h-full bg-elevenlabs-green transition-all duration-100"
                  style={{ width: `${Math.min(100, mic.outputLevel * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
