import { useEffect, useRef } from 'react';

type AgentOrbProps = {
  getInputVolume: () => number;
  getOutputVolume: () => number;
  isSpeaking: boolean;
  status: string;
  className?: string;
};

/**
 * ElevenLabs-style orb: animated circle that reacts to input/output volume.
 * Uses manual volume mode for real-time visualization.
 */
export function AgentOrb({
  getInputVolume,
  getOutputVolume,
  isSpeaking,
  status,
  className = '',
}: AgentOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 280;
    canvas.width = size;
    canvas.height = size;

    let phase = 0;

    const draw = () => {
      try {
        ctx.clearRect(0, 0, size, size);

        let inputVol = 0;
        let outputVol = 0;
        try {
          inputVol = getInputVolume();
          outputVol = getOutputVolume();
        } catch {
          // visionOS or unsupported context
        }
        const vol = Math.max(inputVol, outputVol);
      phase += 0.02;

      const centerX = size / 2;
      const centerY = size / 2;

      // Outer glow when speaking or volume
      const glowRadius = 80 + vol * 40 + Math.sin(phase) * 5;
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, glowRadius * 1.5
      );
      gradient.addColorStop(0, isSpeaking ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.15)');
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Main orb
      const baseRadius = 70 + vol * 25 + Math.sin(phase * 1.5) * 3;
      const orbGradient = ctx.createRadialGradient(
        centerX - 20, centerY - 20, 0,
        centerX, centerY, baseRadius
      );
      orbGradient.addColorStop(0, '#818cf8');
      orbGradient.addColorStop(0.5, '#6366f1');
      orbGradient.addColorStop(1, '#4338ca');
      ctx.fillStyle = orbGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.ellipse(centerX - 15, centerY - 20, 25, 15, -0.3, 0, Math.PI * 2);
      ctx.fill();
      } catch {
        // ignore canvas/volume errors (e.g. visionOS)
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [getInputVolume, getOutputVolume, isSpeaking]);

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting' || status === 'connecting-webrtc';

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="h-[280px] w-[280px] rounded-full"
        style={{ maxWidth: 'min(280px, 80vw)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-elevenlabs-muted text-sm font-medium">
          {isConnecting && 'Connecting...'}
          {isConnected && !isSpeaking && 'Listening'}
          {isConnected && isSpeaking && 'Speaking'}
          {status === 'disconnected' && 'Start conversation'}
        </span>
      </div>
    </div>
  );
}
