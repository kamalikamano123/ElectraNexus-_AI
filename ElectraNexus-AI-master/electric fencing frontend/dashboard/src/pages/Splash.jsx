import React, { useEffect, useState } from 'react';
import { Network, Zap } from 'lucide-react';

export default function Splash() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar to 100% over ~2.5 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; 
      });
    }, 45); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center font-mono relative overflow-hidden selection:bg-brand-500/30">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.95),rgba(15,23,42,0.95)),url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
          <div className="p-6 bg-surface-900/50 rounded-2xl border border-brand-500/30 flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(59,130,246,0.2)]" style={{ animationDuration: '1.5s' }}>
            <Zap size={64} className="text-brand-400" />
          </div>
        </div>
        
        <h1 className="mt-8 text-3xl sm:text-4xl font-extrabold text-white tracking-[0.3em] uppercase animate-pulse text-center">
          Sector Oversight
        </h1>
        <p className="mt-3 text-brand-400 text-sm tracking-widest flex items-center gap-2">
          <Network size={16} className="animate-spin" style={{ animationDuration: '3s' }} /> INITIALIZING GRID...
        </p>

        <div className="w-64 sm:w-80 h-1.5 bg-surface-800 rounded-full mt-8 overflow-hidden border border-surface-700 relative">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-xs text-surface-500 font-mono">SYSTEM BOOT SEQUENCE [{progress}%]</p>
      </div>
    </div>
  );
}
