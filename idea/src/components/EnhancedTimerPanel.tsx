import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const EnhancedTimerPanel: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(18 * 60 + 42);
  const [isRunning, setIsRunning] = useState(false);
  const initialTime = 25 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  return (
    <div className="w-80 bg-white/20 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl p-8 spatial-translucent" enable-xr>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white font-semibold">Focus Session</h3>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">!</span>
        </div>
      </div>
      
      <div className="relative mb-8 flex justify-center">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="transparent"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-3xl font-mono">{formatTime(timeLeft)}</span>
            <span className="text-white text-xs mt-1">remaining</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-white text-sm">Deep Work Session</p>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          type="button"
        >
          {isRunning ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        
        <button
          onClick={resetTimer}
          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          aria-label="Reset timer"
          type="button"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};