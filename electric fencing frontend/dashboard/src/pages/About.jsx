import React, { useState } from 'react';
import { ZapOff, ShieldAlert, BatteryWarning, TrendingDown, CheckCircle2, Cpu, Activity, Radio, Workflow, GitMerge, Cloud, Smartphone, Zap } from 'lucide-react';

const components = [
  {
    id: 'rcm',
    title: 'RCM Sensors',
    icon: <Radio size={24} />,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    description: 'Residual Current Monitors deployed along the fence line measure micro-leakages in real-time, sending analog signals to the DSP.'
  },
  {
    id: 'dsp',
    title: 'DSP Processing',
    icon: <Activity size={24} />,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/30',
    description: 'Digital Signal Processing removes ambient noise, running Fast Fourier Transform (FFT) to extract frequency features of the anomaly.'
  },
  {
    id: 'tdr',
    title: 'Time Domain Reflectometry',
    icon: <GitMerge size={24} />,
    color: 'text-brand-400',
    bg: 'bg-brand-400/10',
    border: 'border-brand-400/30',
    description: 'Calculates distance to faults by sending high-frequency pulses and measuring the delay of the reflected waves from the impedance mismatch.'
  },
  {
    id: 'ai',
    title: 'LSTM AI Model',
    icon: <Cpu size={24} />,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    border: 'border-pink-400/30',
    description: 'Long Short-Term Memory neural network analyzes the time-series DSP features to classify the event (Theft, Fault, Normal).'
  },
  {
    id: 'relay',
    title: 'Smart Relays',
    icon: <Workflow size={24} />,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    description: 'Receives the isolate command from the controller and physically disjoints the affected sector while keeping the remaining fence live.'
  },
  {
    id: 'cloud',
    title: 'Cloud & Dashboard',
    icon: <Cloud size={24} />,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    description: 'IoT gateway (ESP32/Raspberry Pi) sends telemetry to GCP/Firebase, which powers the live real-time dashboard UI you are viewing now.'
  }
];

export default function About() {
  const [activeNode, setActiveNode] = useState(components[0]);

  return (
    <div className="w-full flex-1 flex flex-col pt-8 pb-24 animate-in fade-in duration-500 space-y-24">
      
      {/* ---------- Problem & Solution Section ---------- */}
      <section>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4 text-white">The Challenge & Our Solution</h1>
          <p className="text-surface-400 max-w-2xl mx-auto text-lg">
            Addressing the critical vulnerabilities in traditional electric fencing systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
          
          {/* The Problem */}
          <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-red-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                <ShieldAlert size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white">The Problem</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <ZapOff className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-surface-200 mb-2">Electric Fence Tapping</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Intruders bypass standard fences by tapping into the lines, dropping the voltage gradually without triggering basic alarm relays.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <TrendingDown className="text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-surface-200 mb-2">Significant Power Loss</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Grid leakages and undetected tapping result in an active 8–9% power loss, stressing the distribution system unnecessarily.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <BatteryWarning className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-surface-200 mb-2">Safety Risks (Humans & Animals)</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Traditional systems lack selective tripping. An accidental short by an animal keeps the entire fence dead, increasing vulnerability, or worse, fails to trip leaving a deadly continuous current.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-surface-900/50 rounded-xl border border-surface-800">
                <p className="text-surface-500 text-sm font-medium">Standard systems only check broad voltage drops, completely ignoring the complex frequency variations during a theft attempt.</p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-brand-500 bg-brand-950/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-brand-500/10 rounded-xl text-brand-400">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white">Our AI-IoT Solution</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <Cpu className="text-brand-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-surface-200 mb-2">Residual Current Monitoring (RCM)</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    We capture minute imbalances between the live and neutral lines proactively. High-precision DSP isolates the exact noise frequency introduced by human interference or tapping loads.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-blue-400 mt-1 flex-shrink-0 font-bold px-1">TDR</div>
                <div>
                  <h3 className="text-xl font-semibold text-surface-200 mb-2">Pinpoint Fault Localization</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Using Time Domain Reflectometry, the system calculates the exact distance to the fault by measuring the time delay of signal reflection, allowing immediate physical dispatch.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-purple-400 mt-1 flex-shrink-0 font-bold px-1.5">AI</div>
                <div>
                  <h3 className="text-xl font-semibold text-surface-200 mb-2">LSTM Deep Learning Engine</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Our cloud-deployed LSTM model analyzes historical variations and Live FFT spectrum to predict if the anomaly is a theft attempt, an animal fault, or ambient noise with a confidence score.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-emerald-400 mt-1 flex-shrink-0 font-bold px-1.5">IoT</div>
                <div>
                  <h3 className="text-xl font-semibold text-surface-200 mb-2">Selective Smart Tripping</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Instead of shutting down the entire perimeter, smart relays isolate only the affected segment, keeping 90% of the boundary actively defended.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Architecture Section ---------- */}
      <section>
        <div className="text-center mb-12 pt-12 border-t border-surface-800">
          <h2 className="text-4xl font-extrabold mb-4 text-white">System Architecture</h2>
          <p className="text-surface-400 max-w-2xl mx-auto text-lg">
            Hover or click on the architectural blocks below to explore how data flows from the physical fence to the cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          
          {/* Interactive Diagram UI (Left & Center) */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-3xl flex flex-col justify-center items-center relative min-h-[500px]">
            
            <div className="flex flex-col items-center gap-6 w-full max-w-lg">
              
              {/* Field Layer */}
              <div className="w-full relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-surface-500 text-sm font-semibold -rotate-90 origin-center tracking-widest uppercase">Field</div>
                <div className="flex justify-center gap-6">
                  <div 
                    className={`w-40 p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${activeNode.id === 'rcm' ? 'border-blue-400 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-surface-700 bg-surface-800/50 hover:border-surface-600'}`}
                    onMouseEnter={() => setActiveNode(components[0])}
                  >
                    <Radio className={activeNode.id === 'rcm' ? 'text-blue-400' : 'text-surface-400'} size={28} />
                    <span className="font-medium text-sm text-center">RCM Sensors</span>
                  </div>
                  
                  <div 
                    className={`w-40 p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${activeNode.id === 'relay' ? 'border-orange-400 bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'border-surface-700 bg-surface-800/50 hover:border-surface-600'}`}
                    onMouseEnter={() => setActiveNode(components[4])}
                  >
                    <Workflow className={activeNode.id === 'relay' ? 'text-orange-400' : 'text-surface-400'} size={28} />
                    <span className="font-medium text-sm text-center">Smart Relays</span>
                  </div>
                </div>
              </div>

              {/* Down Arrow connection */}
              <div className="h-8 w-px bg-gradient-to-b from-surface-600 to-brand-500/50"></div>

              {/* Edge Processing Layer */}
              <div className="w-full relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-surface-500 text-sm font-semibold -rotate-90 origin-center tracking-widest uppercase">Edge</div>
                <div className="flex justify-center gap-6">
                  <div 
                    className={`w-36 p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${activeNode.id === 'dsp' ? 'border-purple-400 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-surface-700 bg-surface-800/50 hover:border-surface-600'}`}
                    onMouseEnter={() => setActiveNode(components[1])}
                  >
                    <Activity className={activeNode.id === 'dsp' ? 'text-purple-400' : 'text-surface-400'} size={28} />
                    <span className="font-medium text-sm text-center">DSP Units</span>
                  </div>

                  <div 
                    className={`w-36 p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${activeNode.id === 'tdr' ? 'border-brand-400 bg-brand-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-surface-700 bg-surface-800/50 hover:border-surface-600'}`}
                    onMouseEnter={() => setActiveNode(components[2])}
                  >
                    <GitMerge className={activeNode.id === 'tdr' ? 'text-brand-400' : 'text-surface-400'} size={28} />
                    <span className="font-medium text-sm text-center">TDR Link</span>
                  </div>
                </div>
              </div>

              {/* Down Arrow connection */}
              <div className="h-8 w-px bg-gradient-to-b from-brand-500/50 to-pink-500/50"></div>

              {/* AI Layer */}
               <div className="w-full relative flex justify-center">
                 <div 
                    className={`w-64 p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${activeNode.id === 'ai' ? 'border-pink-400 bg-pink-500/20 shadow-[0_0_20px_rgba(2ec4b6,0.2)]' : 'border-surface-700 bg-surface-800/50 hover:border-surface-600'}`}
                    onMouseEnter={() => setActiveNode(components[3])}
                  >
                    <Cpu className={activeNode.id === 'ai' ? 'text-pink-400' : 'text-surface-400'} size={28} />
                    <span className="font-bold text-sm text-center tracking-wide text-white">LSTM Inference Engine</span>
                  </div>
              </div>

              <div className="h-8 w-px bg-gradient-to-b from-pink-500/50 to-cyan-500/50"></div>

              {/* Cloud Layer */}
              <div className="w-full relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-surface-500 text-sm font-semibold -rotate-90 origin-center tracking-widest uppercase">Cloud</div>
                <div className="flex justify-center gap-6">
                   <div 
                    className={`w-48 p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${activeNode.id === 'cloud' ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-surface-700 bg-surface-800/50 hover:border-surface-600'}`}
                    onMouseEnter={() => setActiveNode(components[5])}
                  >
                    <div className="flex gap-2">
                      <Cloud className={activeNode.id === 'cloud' ? 'text-cyan-400' : 'text-surface-400'} size={28} />
                      <Smartphone className={activeNode.id === 'cloud' ? 'text-cyan-400' : 'text-surface-400'} size={28} />
                    </div>
                    <span className="font-medium text-sm text-center">Live Monitoring UI</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Info Panel (Right) */}
          <div className="glass-panel rounded-3xl overflow-hidden relative border border-surface-700">
             <div className={`h-2 w-full ${activeNode.bg.replace('/10', '')} border-b ${activeNode.border} transition-colors duration-300`}></div>
             <div className="p-8">
               <div className={`inline-flex p-4 rounded-2xl ${activeNode.bg} ${activeNode.color} mb-6 transition-colors duration-300`}>
                 {activeNode.icon}
               </div>
               <h3 className="text-2xl font-bold text-white mb-4 transition-all">{activeNode.title}</h3>
               <p className="text-surface-300 leading-relaxed text-lg transition-all">{activeNode.description}</p>
               
               <div className="mt-8 pt-8 border-t border-surface-800">
                  <div className="flex items-center gap-2 text-surface-500 text-sm font-medium">
                    <Zap size={16} /> Interactive Component Model
                  </div>
                  <p className="text-surface-400 text-xs mt-2">Corresponds to Figure 11 from the project research paper, depicting end-to-end information routing.</p>
               </div>
             </div>
          </div>

        </div>
      </section>
    
    </div>
  );
}
