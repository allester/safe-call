type SummaryPanelProps = {
  summary: string;
  isGenerating?: boolean;
  className?: string;
};

/**
 * Side panel showing conversation summary (placeholder or LLM summary).
 */
export function SummaryPanel({
  summary,
  isGenerating = false,
  className = '',
}: SummaryPanelProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-elevenlabs-border bg-elevenlabs-card overflow-hidden ${className}`}
    >
      <div className="px-4 py-3 border-b border-elevenlabs-border">
        <h3 className="text-sm font-semibold text-white">Summary</h3>
        <p className="text-xs text-elevenlabs-muted mt-0.5">
          {isGenerating ? 'Updating...' : 'Conversation summary'}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 min-h-[140px] max-h-[240px] scrollbar-thin">
        {summary ? (
          <p className="text-sm text-elevenlabs-muted leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        ) : (
          <p className="text-sm text-elevenlabs-muted italic">
            Summary will appear here as you talk. You can also generate a summary after the call.
          </p>
        )}
        {isGenerating && (
          <div className="mt-2 flex gap-1">
            <span className="w-2 h-2 rounded-full bg-elevenlabs-accent animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-elevenlabs-accent animate-pulse delay-75" />
            <span className="w-2 h-2 rounded-full bg-elevenlabs-accent animate-pulse delay-150" />
          </div>
        )}
      </div>
    </div>
  );
}
