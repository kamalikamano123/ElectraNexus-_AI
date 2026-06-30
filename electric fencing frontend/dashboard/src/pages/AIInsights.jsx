import React from 'react';
import { BrainCircuit, LineChart, Network, BarChart3 } from 'lucide-react';

export default function AIInsights() {
  return (
    <div className="w-full flex-1 flex flex-col pt-8 pb-24 animate-in fade-in duration-500">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 text-white">AI Engine Insights</h1>
        <p className="text-surface-400 max-w-2xl mx-auto text-lg">
          Understanding the Long Short-Term Memory (LSTM) network behind risk prediction.
        </p>
      </div>

      {/* Hero Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
        
        {/* Input Pipeline */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Network size={20} />
            <h3 className="font-bold text-lg">Input Features</h3>
          </div>
          <p className="text-surface-300 text-sm mb-6 flex-1">
            The neural network does not process raw voltage. Instead, it relies on feature-engineered signals from the DSP unit.
          </p>
          <ul className="space-y-3">
            <li className="flex justify-between items-center bg-surface-800/50 p-3 rounded-lg border border-surface-700">
              <span className="text-sm font-medium">Residual current shift</span>
              <span className="text-xs text-brand-400 bg-brand-400/10 px-2 py-1 rounded">Primary</span>
            </li>
            <li className="flex justify-between items-center bg-surface-800/50 p-3 rounded-lg border border-surface-700">
              <span className="text-sm font-medium">Voltage variation (ΔV/Δt)</span>
              <span className="text-xs text-brand-400 bg-brand-400/10 px-2 py-1 rounded">Secondary</span>
            </li>
            <li className="flex justify-between items-center bg-surface-800/50 p-3 rounded-lg border border-surface-700">
              <span className="text-sm font-medium">FFT Spectral Density</span>
              <span className="text-xs text-brand-400 bg-brand-400/10 px-2 py-1 rounded">Pattern</span>
            </li>
          </ul>
        </div>

        {/* Blackbox */}
        <div className="glass-panel bg-gradient-to-br from-surface-900 via-surface-900 to-purple-900/20 p-6 rounded-2xl flex flex-col justify-center items-center text-center relative border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
           <div className="absolute top-1/2 left-0 w-full h-px bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
           <div className="absolute left-1/2 top-0 h-full w-px bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
           
           <div className="z-10 bg-surface-950 p-4 rounded-full border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4">
             <BrainCircuit size={40} className="text-purple-400" />
           </div>
           
           <h3 className="text-xl font-bold text-white z-10">LSTM Network</h3>
           <p className="text-surface-400 text-xs mt-2 max-w-[200px] z-10">
             Sequence learning model perfectly suited for time-series signal classification.
           </p>
        </div>

        {/* Output Pipeline */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-brand-400">
            <LineChart size={20} />
            <h3 className="font-bold text-lg">Prediction Output</h3>
          </div>
          <p className="text-surface-300 text-sm mb-6 flex-1">
            The network condenses its findings into actionable insights for the system relays and UI.
          </p>
          <div className="space-y-4">
             <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
               <div className="flex justify-between text-sm mb-1">
                 <span className="text-red-400 font-semibold">Theft / Break-in</span>
                 <span className="text-white">92.4%</span>
               </div>
               <div className="w-full bg-surface-800 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-red-500 h-full w-[92.4%]"></div>
               </div>
             </div>
             
             <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
               <div className="flex justify-between text-sm mb-1">
                 <span className="text-orange-400 font-semibold">Component Fault</span>
                 <span className="text-white">5.1%</span>
               </div>
               <div className="w-full bg-surface-800 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-orange-500 h-full w-[5.1%]"></div>
               </div>
             </div>
             
             <div className="p-3 bg-brand-500/10 border border-brand-500/30 rounded-lg">
               <div className="flex justify-between text-sm mb-1">
                 <span className="text-brand-400 font-semibold">Normal Operation</span>
                 <span className="text-white">2.5%</span>
               </div>
               <div className="w-full bg-surface-800 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-brand-500 h-full w-[2.5%]"></div>
               </div>
             </div>
          </div>
        </div>

      </div>

      {/* Visual Data Demo */}
      <div className="glass-panel p-8 rounded-3xl border border-surface-700 w-full max-w-6xl mx-auto">
         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BarChart3 className="text-blue-400" /> Reference Signals (Paper Figures 8 & 9)</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-900 rounded-xl p-6 border border-surface-800 text-center flex flex-col">
              <h4 className="text-surface-300 mb-4 font-medium">Normal Time Series Waveform</h4>
              <div className="flex-1 min-h-[150px] relative border-b border-l border-surface-700 flex items-center justify-center overflow-hidden">
                 {/* Fake Sine Wave Graphic */}
                 <svg viewBox="0 0 100 20" className="w-full h-24 stroke-brand-500 fill-none stroke-[0.5]">
                    <path d="M0,10 Q5,0 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10" />
                 </svg>
                 <div className="absolute inset-x-0 top-1/2 h-px bg-surface-700 border-dashed" />
              </div>
              <p className="text-xs text-surface-500 mt-4">Uniform voltage peaks, nominal baseline leakage.</p>
            </div>
            
            <div className="bg-surface-900 rounded-xl p-6 border border-surface-800 text-center flex flex-col">
              <h4 className="text-surface-300 mb-4 font-medium">Tapping/Distortion Signature</h4>
              <div className="flex-1 min-h-[150px] relative border-b border-l border-surface-700 flex items-center justify-center overflow-hidden">
                 {/* Fake Distorted Wave Graphic */}
                 <svg viewBox="0 0 100 20" className="w-full h-24 stroke-red-500 fill-none stroke-[0.5]">
                    <path d="M0,10 Q2,-5 5,10 T12,12 T15,8 T20,10 T22,-2 25,10 T30,10 T35,14 T40,10 T45,-8 50,10 T60,10 T70,12 T80,8 T90,10 T100,10" />
                 </svg>
                 <div className="absolute inset-x-0 top-1/2 h-px bg-surface-700 border-dashed" />
              </div>
              <p className="text-xs text-surface-500 mt-4">Sporadic amplitude drops and high-frequency noise spikes.</p>
            </div>
         </div>
      </div>
    
    </div>
  );
}
