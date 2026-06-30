import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Zap, ServerCog, ActivitySquare, ChevronRight, AlertTriangle, CheckCircle2, MapPin, Clock, ShieldAlert, Cpu, Power, LocateFixed } from 'lucide-react';

export default function Home() {
  const recentEvents = [
    { id: 1, time: 'Just Now', type: 'Fault', location: 'Sector 014', desc: 'Line voltage cascade failure. Crew dispatched.' },
    { id: 2, time: '10:15 AM', type: 'Warning', location: 'Sector 029', desc: 'Slight residual current variance (+1.2A).' },
    { id: 3, time: '09:00 AM', type: 'System', location: 'Global Grid', desc: 'Daily automated grid diagnostic completed successfully.' },
  ];

  return (
    <div className="w-full flex-1 flex flex-col pt-8 pb-16 animate-in fade-in duration-700">
      
      {/* Quick Status Bar */}
      <div className="max-w-6xl mx-auto w-full px-4 mb-8">
        <div className="bg-surface-800 border border-surface-700 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
           <div className="flex items-center gap-3">
             <div className="relative flex items-center justify-center">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
               <div className="w-3 h-3 bg-red-500 rounded-full relative z-10"></div>
             </div>
             <span className="font-bold text-white tracking-wide">SYSTEM OVERWATCH: <span className="text-red-400">ACTIVE FAULTS DETECTED</span></span>
           </div>
           
           <div className="flex gap-4 sm:gap-6 text-sm px-4 py-2 bg-surface-900 rounded-lg border border-surface-700/50">
             <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> <span className="text-surface-300 font-medium">40 Normal</span></div>
             <div className="flex items-center gap-2"><AlertTriangle size={16} className="text-yellow-500"/> <span className="text-surface-300 font-medium">7 Warnings</span></div>
             <div className="flex items-center gap-2"><ShieldAlert size={16} className="text-red-500"/> <span className="font-bold text-red-500">3 Alerts</span></div>
           </div>
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto mb-16 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
          <ShieldCheck size={14} /> Official Government Tech Portal
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
          National Grid <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Smart Grid Overwatch</span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(59,130,246,0.5)] uppercase tracking-wider text-sm"
          >
            Access Live Dashboard <ChevronRight size={18} />
          </NavLink>
          <NavLink
            to="/about"
            className="flex items-center gap-2 bg-surface-800 hover:bg-surface-700 border border-surface-600 text-white px-8 py-4 rounded-xl font-bold transition-all uppercase tracking-wider text-sm"
          >
            System Architecture & Info <ChevronRight size={18} />
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full px-4 mb-10">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Action Module 1 */}
          <div className="glass-panel p-6 rounded-xl border border-surface-700 hover:border-blue-500/50 transition-colors flex flex-col justify-between h-full">
            <div>
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2"><Cpu className="text-blue-400" size={20}/> Core Diagnostics</h3>
                 <span className="text-[10px] font-mono text-blue-400 border border-blue-500/30 px-2 py-1 rounded bg-blue-500/10">SYNCED</span>
               </div>
               <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm border-b border-surface-800 pb-2">
                   <span className="text-surface-400">Main Feed Voltage</span>
                   <span className="text-white font-mono font-bold">9.8 kV</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-surface-800 pb-2">
                   <span className="text-surface-400">Total Ambient Leakage</span>
                   <span className="text-white font-mono font-bold">142 mA</span>
                 </div>
                 <div className="flex justify-between items-center text-sm pb-2">
                   <span className="text-surface-400">Neural Net Confidence</span>
                   <span className="text-emerald-400 font-mono font-bold">99.1%</span>
                 </div>
               </div>
            </div>
            <button className="flex justify-center items-center gap-2 w-full mt-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-bold uppercase rounded border border-blue-500/30 transition-all cursor-pointer">
              Run Diagnostics Sequence
            </button>
          </div>

          {/* Action Module 2 */}
          <div className="glass-panel p-6 rounded-xl border border-surface-700 hover:border-red-500/50 transition-colors flex flex-col justify-between h-full">
            <div>
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2"><Power className="text-red-400" size={20}/> Hardware Controls</h3>
                 <span className="text-[10px] font-mono text-red-400 border border-red-500/30 px-2 py-1 rounded bg-red-500/10">READY</span>
               </div>
               <div className="space-y-3 mb-4">
                  <p className="text-xs leading-relaxed text-surface-400">Override relay connections or initiate a physical sector trip globally from this module.</p>
               </div>
            </div>
            <div className="space-y-2">
               <button className="flex justify-center items-center gap-2 w-full py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold uppercase rounded border border-red-500/30 transition-all cursor-pointer">
                 <Zap size={14}/> Trip Entire Perimeter
               </button>
               <button className="flex justify-center items-center gap-2 w-full py-2 bg-surface-800 hover:bg-surface-700 text-surface-300 text-xs font-bold uppercase rounded border border-surface-700 transition-all cursor-pointer">
                 <LocateFixed size={14}/> Ping All Nodes
               </button>
            </div>
          </div>

          <div className="sm:col-span-2 glass-panel p-6 rounded-xl border border-surface-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              <StatBox value="50" label="Monitored Sectors" />
              <StatBox value="<2s" label="DSP Latency" />
              <StatBox value="99.9%" label="System Uptime" />
              <StatBox value="24/7" label="Secure Integrity" />
            </div>
          </div>
        </div>

        {/* Live Events Feed Widget */}
        <div className="glass-panel p-5 rounded-xl border border-surface-700 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 border-b border-surface-700 pb-3">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
               <Clock size={18} className="text-blue-400"/> Critical Log Feed
             </h3>
             <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded font-bold animate-pulse">LIVE</span>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            {recentEvents.map(event => (
              <div key={event.id} className="flex gap-3 relative">
                <div className="flex flex-col items-center mt-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${event.type === 'Fault' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : event.type === 'Warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                  <div className="w-[1px] h-full bg-surface-700 mt-1"></div>
                </div>
                <div className={`p-3 rounded-lg flex-1 border ${event.type === 'Fault' ? 'bg-red-500/10 border-red-500/30' : 'bg-surface-800/50 border-surface-700'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs font-bold uppercase ${event.type === 'Fault' ? 'text-red-400' : event.type === 'Warning' ? 'text-yellow-400' : 'text-blue-400'}`}>{event.type}</span>
                    <span className="text-xs text-surface-400 font-mono">{event.time}</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">{event.location}</div>
                  <div className="text-xs text-surface-300 leading-relaxed">{event.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          <NavLink to="/dispatch" className="mt-4 w-full py-2 bg-surface-800 hover:bg-surface-700 text-surface-300 text-xs font-bold uppercase tracking-wider rounded border border-surface-600 flex items-center justify-center gap-2 transition-colors">
            View Dispatch Logs
          </NavLink>
        </div>
      </div>

    </div>
  );
}



function StatBox({ value, label }) {
  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-surface-500">
        {value}
      </div>
      <div className="text-[10px] md:text-xs text-surface-400 font-medium uppercase tracking-wider text-center">{label}</div>
    </div>
  );
}
