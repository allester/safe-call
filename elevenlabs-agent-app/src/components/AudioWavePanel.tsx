import { useEffect, useRef } from 'react';

type AudioWavePanelProps = {
  getInputByteFrequencyData: () => Uint8Array | undefined;
  getOutputByteFrequencyData: () => Uint8Array | undefined;
  isActive: boolean;
  className?: string;
};

const BAR_COUNT = 32;

/**
 * ElevenLabs-style bar visualizer for input (mic) and output (agent) audio.
 */
export function AudioWavePanel({
  getInputByteFrequencyData,
  getOutputByteFrequencyData,
  isActive,
  className = '',
}: AudioWavePanelProps) {
  const inputCanvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const inputCanvas = inputCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;
    if (!inputCanvas || !outputCanvas) return;

    const inputCtx = inputCanvas.getContext('2d');
    const outputCtx = outputCanvas.getContext('2d');
    if (!inputCtx || !outputCtx) return;

    const w = inputCanvas.width = inputCanvas.offsetWidth;
    const h = inputCanvas.height = inputCanvas.offsetHeight;
    outputCanvas.width = outputCanvas.offsetWidth;
    outputCanvas.height = outputCanvas.offsetHeight;

    const draw = () => {
      try {
        const inputData = getInputByteFrequencyData?.();
        const outputData = getOutputByteFrequencyData?.();

        const drawBars = (
          ctx: CanvasRenderingContext2D,
          data: Uint8Array | undefined,
          color: string,
          width: number,
          height: number
        ) => {
          ctx.clearRect(0, 0, width, height);
          if (!data || data.length === 0) return;

          const barWidth = (width - (BAR_COUNT - 1) * 2) / BAR_COUNT;
          const step = Math.floor(data.length / BAR_COUNT);

          for (let i = 0; i < BAR_COUNT; i++) {
            const value = data[i * step] ?? 0;
            const barHeight = Math.max(2, (value / 255) * height * 0.8);
            const x = i * (barWidth + 2);
            const y = (height - barHeight) / 2;

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.fillRect(x, y, barWidth, barHeight);
            ctx.fill();
          }
        };

        drawBars(inputCtx, inputData, 'rgba(99, 102, 241, 0.8)', w, h);
        drawBars(outputCtx, outputData, 'rgba(34, 197, 94, 0.8)', outputCanvas.width, outputCanvas.height);
      } catch {
        // ignore (e.g. visionOS or missing APIs)
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [getInputByteFrequencyData, getOutputByteFrequencyData]);

  return (
    <div
      className={`flex flex-col rounded-xl border border-elevenlabs-border bg-elevenlabs-card overflow-hidden ${className}`}
    >
      <div className="px-4 py-3 border-b border-elevenlabs-border">
        <h3 className="text-sm font-semibold text-white">Audio</h3>
        <p className="text-xs text-elevenlabs-muted mt-0.5">
          {isActive ? 'Live input & output' : 'Start conversation for levels'}
        </p>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs text-elevenlabs-muted mb-1.5">Microphone</p>
          <canvas
            ref={inputCanvasRef}
            className="w-full h-16 rounded-lg bg-elevenlabs-dark/50"
            style={{ height: 64 }}
          />
        </div>
        <div>
          <p className="text-xs text-elevenlabs-muted mb-1.5">Agent</p>
          <canvas
            ref={outputCanvasRef}
            className="w-full h-16 rounded-lg bg-elevenlabs-dark/50"
            style={{ height: 64 }}
          />
        </div>
      </div>
    </div>
  );
}
