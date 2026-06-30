import React, { useState } from 'react';
import { PlayCircle, ShieldAlert, Cpu, PowerOff, Zap, UserX, AlertTriangle } from 'lucide-react';

export default function Simulation() {
  const [activeSim, setActiveSim] = useState('normal'); 
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = (type) => {
    setIsSimulating(true);
    setTimeout(() => {
      setActiveSim(type);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col pt-8 pb-24 animate-in fade-in duration-500">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-white">Interactive Demonstration</h1>
        <p className="text-surface-400 max-w-2xl mx-auto text-lg">
          No hardware connected? No problem. Trigger simulated scenarios to see how the software responds in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Normal Button */}
        <button 
          onClick={() => handleSimulate('normal')}
          disabled={isSimulating}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${activeSim === 'normal' ? 'border-brand-500 bg-brand-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 'border-surface-700 bg-surface-900 hover:bg-surface-800 disabled:opacity-50'}`}
        >
          <div className={`p-4 rounded-full mb-4 ${activeSim === 'normal' ? 'bg-brand-500 text-white' : 'bg-surface-800 text-surface-400'}`}>
            <Zap size={32} />
          </div>
          <h3 className="font-bold text-xl text-white mb-2">Simulate Normal</h3>
          <p className="text-surface-400 text-sm text-center">Baseline voltage and nominal residual current.</p>
        </button>

        {/* Theft Button */}
        <button 
          onClick={() => handleSimulate('theft')}
          disabled={isSimulating}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${activeSim === 'theft' ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.2)]' : 'border-surface-700 bg-surface-900 hover:bg-surface-800 disabled:opacity-50'}`}
        >
          <div className={`p-4 rounded-full mb-4 ${activeSim === 'theft' ? 'bg-orange-500 text-white animate-pulse' : 'bg-surface-800 text-surface-400'}`}>
            <UserX size={32} />
          </div>
          <h3 className="font-bold text-xl text-white mb-2">Simulate Theft</h3>
          <p className="text-surface-400 text-sm text-center">Intruder tapping into the line. High-frequency noise added.</p>
        </button>

        {/* Fault Button */}
        <button 
          onClick={() => handleSimulate('fault')}
          disabled={isSimulating}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${activeSim === 'fault' ? 'border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-surface-700 bg-surface-900 hover:bg-surface-800 disabled:opacity-50'}`}
        >
          <div className={`p-4 rounded-full mb-4 ${activeSim === 'fault' ? 'bg-red-500 text-white animate-pulse' : 'bg-surface-800 text-surface-400'}`}>
            <ShieldAlert size={32} />
          </div>
          <h3 className="font-bold text-xl text-white mb-2">Simulate Fault</h3>
          <p className="text-surface-400 text-sm text-center">Direct short to ground by an animal or branch.</p>
        </button>

      </div>

      {/* Simulator Response Pane */}
      <div className="glass-panel rounded-3xl p-8 border border-surface-700 relative overflow-hidden">
        {/* Loading Overlay */}
        {isSimulating && (
          <div className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
            <Cpu className="text-brand-500 animate-spin mb-4" size={40} />
            <div className="text-white font-mono uppercase tracking-widest text-sm">Processing DSP Output...</div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-8 border-b border-surface-800 pb-4 flex items-center gap-3">
          <PlayCircle className="text-brand-400" /> Reaction Sequence
        </h2>

        <div className="space-y-6">
          
          {/* Step 1: Sensors */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold ${activeSim === 'normal' ? 'bg-brand-500 text-white' : 'bg-surface-700 text-surface-400'}`}>1</div>
              <div className="w-0.5 h-full bg-surface-800 my-2"></div>
            </div>
            <div className="pb-8 flex-1">
              <h4 className="text-lg font-bold text-white mb-2">Sensor Telemetry</h4>
              <div className="bg-surface-900 p-4 rounded-xl border border-surface-800 flex gap-8">
                 <div>
                   <span className="text-surface-500 text-xs block mb-1">Voltage Drop</span>
                   <span className={`font-mono font-bold ${activeSim === 'normal' ? 'text-white' : activeSim === 'theft' ? 'text-orange-400' : 'text-red-400'}`}>
                     {activeSim === 'normal' ? '0.0%' : activeSim === 'theft' ? '5.2%' : '88.9%'}
                   </span>
                 </div>
                 <div>
                   <span className="text-surface-500 text-xs block mb-1">Residual Noise</span>
                   <span className={`font-mono font-bold ${activeSim === 'normal' ? 'text-white' : 'text-purple-400'}`}>
                     {activeSim === 'normal' ? 'Low' : 'Spiking'}
                   </span>
                 </div>
              </div>
            </div>
          </div>

          {/* Step 2: AI */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold ${activeSim !== 'normal' ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(2ec4b6,0.5)]' : 'bg-surface-700 text-surface-400'}`}>2</div>
              <div className="w-0.5 h-full bg-surface-800 my-2"></div>
            </div>
            <div className="pb-8 flex-1">
              <h4 className="text-lg font-bold text-white mb-2">LSTM Classification</h4>
              <div className={`p-4 rounded-xl border ${activeSim === 'normal' ? 'bg-surface-900 border-surface-800' : 'bg-pink-900/20 border-pink-500/30'}`}>
                 {activeSim === 'normal' ? (
                   <div className="text-surface-400">Classified as baseline background noise. No action taken.</div>
                 ) : (
                   <div>
                     <div className="text-pink-400 font-bold mb-1">Anomaly Detected</div>
                     <div className="text-surface-300 text-sm">Pattern matches historical data for {activeSim === 'theft' ? 'unauthorized tapping (Theft)' : 'continuous hard ground (Fault)'}.</div>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Step 3: Action */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold ${activeSim === 'fault' ? 'bg-red-500 text-white' : activeSim === 'theft' ? 'bg-orange-500 text-white' : 'bg-surface-700 text-surface-400'}`}>3</div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-2">Hardware Response</h4>
              <div className="flex items-center gap-4">
                 <div className={`flex items-center gap-3 p-4 rounded-xl border ${activeSim === 'fault' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-surface-900 border-surface-800 text-surface-500'}`}>
                   <PowerOff size={24} />
                   <div className="font-bold">{activeSim === 'fault' ? 'Relay Tripped - Circuit Open' : 'Relays Closed - Fence Live'}</div>
                 </div>
                 
                 {activeSim !== 'normal' && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/50 text-blue-400 animate-pulse">
                      <AlertTriangle size={24} />
                      <div className="font-bold">Security Alert Dispatched</div>
                    </div>
                 )}
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
