import { useEffect, useRef } from 'react';

export interface TranscriptMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

type TranscriptPanelProps = {
  messages: TranscriptMessage[];
  className?: string;
};

/**
 * Side panel showing live transcript (ElevenLabs-style conversation transcript).
 */
export function TranscriptPanel({ messages, className = '' }: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div
      className={`flex flex-col rounded-xl border border-elevenlabs-border bg-elevenlabs-card overflow-hidden ${className}`}
    >
      <div className="px-4 py-3 border-b border-elevenlabs-border">
        <h3 className="text-sm font-semibold text-white">Transcript</h3>
        <p className="text-xs text-elevenlabs-muted mt-0.5">Live conversation</p>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin min-h-[200px] max-h-[320px]"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-elevenlabs-muted italic">No messages yet. Start the conversation.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="text-xs font-medium text-elevenlabs-muted uppercase tracking-wide">
                {msg.role === 'user' ? 'You' : 'Agent'}
              </span>
              <div
                className={`rounded-lg px-3 py-2 text-sm max-w-full ${
                  msg.role === 'user'
                    ? 'bg-elevenlabs-accent/20 text-right'
                    : 'bg-elevenlabs-border/50 text-left'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
