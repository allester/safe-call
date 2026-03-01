import React, { useRef, useEffect, useState } from 'react';
import { Edit, Eraser } from 'lucide-react';

export const EnhancedCanvasPanel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getRelativePosition = (canvas: HTMLCanvasElement, event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getRelativePosition(canvas, e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getRelativePosition(canvas, e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isErasing ? '#ffffff' : brushColor;
    ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e?: React.PointerEvent<HTMLCanvasElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      const canvas = canvasRef.current;
      if (canvas) {
        try { canvas.releasePointerCapture(e.pointerId); } catch {}
      }
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="relative w-[600px] h-[500px] bg-white/20 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl spatial-translucent overflow-hidden" enable-xr>
      <div className="absolute top-0 left-0 right-0 p-6 border-b border-gray-200/50 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">IdeaVerse Canvas</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsErasing(!isErasing)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isErasing ? 'bg-gray-100 hover:bg-gray-200s' : 'text-black'
              }`}
              aria-label={isErasing ? 'Disable eraser' : 'Enable eraser'}
              type="button"
            >
              <Eraser className="w-4 h-4" />
            </button>
            <button 
              onClick={clearCanvas}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Clear canvas"
              type="button"
            >
              <Edit className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 top-20 p-4 flex flex-col">
        <div className="flex-1 relative min-h-0">
          <canvas
            ref={canvasRef}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
            className="w-full h-full border border-gray-200 rounded-2xl cursor-crosshair bg-white"
            style={{ 
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              maxHeight: '100%',
              maxWidth: '100%'
            }}
            aria-label="Drawing canvas"
          />
        </div>
        
        <div className="mt-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-3 flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Color:</label>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
              aria-label="Pick color"
              title="Brush color"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Size:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-20"
              aria-label="Brush size"
              title="Brush size"
            />
            <span className="text-xs text-gray-500 w-6">{brushSize}px</span>
          </div>
          
          <div className="ml-auto">
            <span className={`text-xs px-2 py-1 rounded-full ${
              isErasing ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {isErasing ? 'Erase' : 'Draw'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};