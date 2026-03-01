/**
 * localStorage keys and helpers for syncing main-window state to Transcript/Summary/Audio windows.
 */

export const DISPATCH_KEYS = {
  transcript: 'elevenlabs-transcript',
  summary: 'elevenlabs-summary',
  mic: 'elevenlabs-mic',
} as const;

export interface TranscriptMessageSync {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export function writeTranscript(messages: TranscriptMessageSync[]): void {
  try {
    localStorage.setItem(DISPATCH_KEYS.transcript, JSON.stringify(messages));
  } catch {
    // ignore
  }
}

export function readTranscript(): TranscriptMessageSync[] {
  try {
    const raw = localStorage.getItem(DISPATCH_KEYS.transcript);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function writeSummary(summary: string): void {
  try {
    localStorage.setItem(DISPATCH_KEYS.summary, summary);
  } catch {
    // ignore
  }
}

export function readSummary(): string {
  try {
    return localStorage.getItem(DISPATCH_KEYS.summary) ?? '';
  } catch {
    return '';
  }
}

export interface MicStateSync {
  isActive: boolean;
  inputLevel: number;
  outputLevel: number;
}

export function writeMic(state: MicStateSync): void {
  try {
    localStorage.setItem(DISPATCH_KEYS.mic, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function readMic(): MicStateSync {
  try {
    const raw = localStorage.getItem(DISPATCH_KEYS.mic);
    if (!raw) return { isActive: false, inputLevel: 0, outputLevel: 0 };
    const data = JSON.parse(raw);
    return {
      isActive: Boolean(data?.isActive),
      inputLevel: Number(data?.inputLevel) || 0,
      outputLevel: Number(data?.outputLevel) || 0,
    };
  } catch {
    return { isActive: false, inputLevel: 0, outputLevel: 0 };
  }
}
