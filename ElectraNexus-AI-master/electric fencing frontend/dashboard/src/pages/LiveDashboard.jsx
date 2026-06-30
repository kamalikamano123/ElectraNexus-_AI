import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, AlertTriangle, Crosshair, Power, MapPin, Brain, ShieldAlert, CheckCircle } from 'lucide-react';

// Mock Data Generators for Recharts
const generateTimeSeriesData = (points, isFault = false) => {
  return Array.from({ length: points }).map((_, i) => ({
    time: `10:${i < 10 ? '0'+i : i}`,
    current: isFault && i > 15 ? 4.2 + Math.random() * 2 : 2.5 + Math.random() * 0.2,
    voltage: isFault && i > 15 ? 7000 + Math.random() * 500 : 9800 + Math.random() * 100,
  }));
};

const generateResidualData = (points, isTheft = false) => {
  return Array.from({ length: points }).map((_, i) => {
    const base = Math.sin(i * 0.5) * 5;
    const noise = isTheft ? (Math.random() - 0.5) * 15 : (Math.random() - 0.5) * 2;
    return {
      index: i,
      value: base + noise,
    };
  });
};

export default function LiveDashboard() {
  const poleLocations = Array.from({ length: 100 }, (_, i) => `Transmission Pole - Sector ${String(i + 1).padStart(3, '0')}`);

  const [systemState, setSystemState] = useState('normal'); // normal, warning, fault
  const [data, setData] = useState(generateTimeSeriesData(30));
  const [residualData, setResidualData] = useState(generateResidualData(50));
  const [selectedPole, setSelectedPole] = useState(poleLocations[0]);
  const [prediction, setPrediction] = useState({
    result: "Loading...",
    probability: 0
  });
  const [realData, setRealData] = useState([]);
  const [countdown, setCountdown] = useState(null);

  const IR_THRESHOLD = 80;
  const isHazardous = Boolean(
    prediction.result?.includes("Unauthorized") || 
    (prediction.Ir !== undefined && prediction.Ir > IR_THRESHOLD) || 
    prediction.result?.includes("CRITICAL")
  );

  useEffect(() => {
    let timer;
    if (isHazardous && systemState !== 'fault') {
      if (countdown === null) {
        setCountdown(5);
      } else if (countdown === 0) {
        setSystemState('fault');
        setCountdown(null);
      } else if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(prev => prev - 1);
        }, 1000);
      }
    } else if (!isHazardous && countdown !== null) {
      setCountdown(null);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHazardous, countdown, systemState]);

  // 🔥 API CALL (ADDED)
  const getPrediction = async () => {
  try {
    // 🔥 1. GET REAL DATA FROM BACKEND
    const dataRes = await fetch("http://192.168.1.4:5000/live-data");
    const live = await dataRes.json();
setRealData(live);

    // 🔥 2. SEND TO MODEL
    const res = await fetch("http://192.168.1.4:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(live)
    });

    const result = await res.json();

    setPrediction(result);

  } catch (err) {
    console.error(err);
  }
};

  // Simulate live data ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = parseInt(prev[prev.length - 1].time.split(':')[1]);
        const nextTime = (lastTime + 1) % 60;
        
        let newCurrent = 2.5 + Math.random() * 0.2;
        let newVoltage = 9800 + Math.random() * 100;
        
        if (systemState === 'fault') {
          newCurrent = 4.2 + Math.random() * 2;
          newVoltage = 7000 + Math.random() * 500;
        } else if (systemState === 'warning') {
          newVoltage = 9200 + Math.random() * 300;
          newCurrent = 2.8 + Math.random() * 0.5;
        }
        
        newData.push({
          time: `10:${nextTime < 10 ? '0'+nextTime : nextTime}`,
          current: newCurrent,
          voltage: newVoltage
        });
        return newData;
      });

      setResidualData(generateResidualData(50, systemState === 'warning'));
    }, 2000);
    
    getPrediction();
    const interval2 = setInterval(getPrediction, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };

  }, [systemState]);

  // Demo controls to change system state for the UI preview
  const cycleState = () => {
    const states = ['normal', 'warning', 'fault'];
    const nextIndex = (states.indexOf(systemState) + 1) % states.length;
    setSystemState(states[nextIndex]);
  };

  const getStatusColor = () => {
    if (systemState === 'normal') return 'text-brand-400 border-brand-500/30 bg-brand-500/10';
    if (systemState === 'warning') return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    return 'text-red-400 border-red-500/30 bg-red-500/10';
  };

  return (
    <div className="w-full flex-1 flex flex-col pt-4 pb-12 animate-in fade-in duration-500">
      
      {/* Dashboard Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Activity className="text-brand-400" /> Live Network Intelligence
          </h1>
          <p className="text-surface-400">Real-time monitoring of <span className="text-brand-400 font-medium">{selectedPole}</span></p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-surface-800 border border-surface-700 px-3 py-1.5 rounded-lg">
             <MapPin size={18} className="text-brand-400" />
             <select 
               value={selectedPole}
               onChange={(e) => setSelectedPole(e.target.value)}
               className="bg-transparent border-none text-white text-sm focus:ring-0 outline-none cursor-pointer py-1 pe-2"
             >
               {poleLocations.map(pole => (
                 <option key={pole} value={pole} className="bg-surface-800">{pole}</option>
               ))}
             </select>
          </div>

          <button 
            onClick={cycleState}
            className="px-4 py-2 bg-surface-800 hover:bg-surface-700 rounded-lg border border-surface-600 text-sm font-medium transition-colors"
          >
            Simulate State: <span className="uppercase text-white">{systemState}</span>
          </button>
          
          <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 font-semibold ${getStatusColor()}`}>
            {systemState === 'normal' && <CheckCircle size={18} />}
            {systemState === 'warning' && <AlertTriangle size={18} />}
            {systemState === 'fault' && <ShieldAlert size={18} />}
            SYSTEM {systemState === 'fault' ? 'CRITICAL' : systemState.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="glass-panel p-5 rounded-xl border-t-2 border-t-white/10">
          <div className="flex justify-between items-start mb-2">
             <span className="text-surface-400 text-sm font-medium">Fence Voltage</span>
             <Zap size={18} className="text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
             {systemState === 'normal' ? '9.8' : systemState === 'warning' ? '9.2' : '7.1'} <span className="text-surface-500 text-lg">kV</span>
          </div>
          <div className="text-xs text-brand-400 flex items-center gap-1">↑ Nominal Range</div>
        </div>
        
        <div className="glass-panel p-5 rounded-xl border-t-2 border-t-white/10">
          <div className="flex justify-between items-start mb-2">
             <span className="text-surface-400 text-sm font-medium">Line Current</span>
             <Activity size={18} className="text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
             {realData.length 
  ? realData[realData.length - 1].RMS.toFixed(2) 
  : "--"} <span className="text-surface-500 text-lg">A</span>
          </div>
          <div className={`text-xs flex items-center gap-1 ${systemState === 'fault' ? 'text-red-400' : 'text-surface-400'}`}>
            {systemState === 'fault' ? '⚠ High draw detected' : 'Standard load'}
          </div>
        </div>
        
        <div className="glass-panel p-5 rounded-xl border-t-2 border-t-white/10">
          <div className="flex justify-between items-start mb-2">
             <span className="text-surface-400 text-sm font-medium">Residual Leakage</span>
             <AlertTriangle size={18} className="text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
             {systemState === 'normal' ? '12' : systemState === 'warning' ? '85' : '140'} <span className="text-surface-500 text-lg">mA</span>
          </div>
          <div className={`text-xs flex items-center gap-1 ${systemState === 'normal' ? 'text-surface-400' : 'text-orange-400'}`}>
             {systemState === 'normal' ? 'Natural baseline' : 'Imbalance detected'}
          </div>
        </div>
        
        <div className={`glass-panel p-5 rounded-xl border-t-2 ${systemState === 'fault' ? 'border-t-red-500 bg-red-500/5' : 'border-t-white/10'}`}>
          <div className="flex justify-between items-start mb-2">
             <span className="text-surface-400 text-sm font-medium">Relay Status</span>
             <Power size={18} className={systemState === 'fault' ? 'text-red-500 animate-pulse' : 'text-brand-500'} />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
             {systemState === 'fault' ? 'TRIPPED' : 'ENGAGED'}
          </div>
          <div className="text-xs text-surface-400 flex items-center gap-1">{selectedPole.split(' - ')[0]} Switch</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Graph Area */}
        <div className="lg:col-span-2 space-y-6">
           <div className="glass-panel p-5 rounded-xl border border-surface-700 h-[350px] flex flex-col">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-semibold text-white">Current & Voltage Trend</h3>
               <div className="flex gap-4 text-xs font-medium">
                 <span className="flex items-center gap-1 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Current</span>
                 <span className="flex items-center gap-1 text-yellow-400"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Voltage</span>
               </div>
             </div>
             <div className="flex-1 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={
  realData && realData.length > 0
    ? realData.map((d, i) => ({
        time: i,
        current: d.RMS,
        voltage: d.Peak * 1000
      }))
    : []
}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} />
                    <YAxis yAxisId="left" stroke="#60a5fa" tick={{fontSize: 12}} domain={['auto', 'auto']} />
                    <YAxis yAxisId="right" orientation="right" stroke="#facc15" tick={{fontSize: 12}} domain={[0, 12000]} />
                    <RechartsTooltip contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px'}} />
                    <Line yAxisId="left" type="monotone" dataKey="current" stroke="#60a5fa" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line yAxisId="right" type="stepAfter" dataKey="voltage" stroke="#facc15" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
               </ResponsiveContainer>
             </div>
           </div>
           
           <div className="glass-panel p-5 rounded-xl border border-surface-700 h-[250px] flex flex-col">
             <h3 className="font-semibold text-white mb-4">High-Frequency Residual Waveform (DSP Output)</h3>
             <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={residualData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={systemState === 'warning' ? '#f97316' : '#8b5cf6'} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={systemState === 'warning' ? '#f97316' : '#8b5cf6'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="index" hide />
                    <YAxis stroke="#475569" domain={[-20, 20]} tick={{fontSize: 12}} />
                    <Area type="monotone" dataKey="value" stroke={systemState === 'warning' ? '#f97316' : '#8b5cf6'} fillOpacity={1} fill="url(#colorValue)" isAnimationActive={false} />
                  </AreaChart>
               </ResponsiveContainer>
             </div>
           </div>
        </div>

        {/* Side Panel: Intelligence & Alerts */}
        <div className="space-y-6">
           
           {/* AI Prediction Card */}
           <div className="glass-panel p-6 rounded-xl border border-surface-700 relative overflow-hidden group">
             <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] pointer-events-none -z-10 transition-colors duration-700 ${systemState === 'warning' ? 'bg-orange-500/20' : systemState === 'fault' ? 'bg-red-500/20' : 'bg-brand-500/20'}`}></div>
             
             <h3 className="font-semibold flex items-center gap-2 text-white mb-6 border-b border-surface-800 pb-3">
               <Brain className="text-pink-400" /> LSTM Engine Verdict
             </h3>
             
             <div className="space-y-4">
               <div>
                 <div className="text-surface-400 text-xs mb-1 uppercase tracking-wider">
                   Classification
                 </div>
                 <div className={`text-2xl font-bold ${
                    prediction.result?.includes("CRITICAL")
                      ? "text-red-400"
                      : prediction.result?.includes("Unauthorized")
                      ? "text-orange-400"
                      : "text-brand-400"
                        }`}>
                  {prediction.result}
                 </div>
               </div>

               {(countdown !== null || systemState === 'fault') && (
                 <div className={`rounded-lg p-3 my-3 ${systemState === 'fault' ? 'bg-red-500/20 border border-red-500/50' : 'bg-orange-500/10 border border-orange-500/30 animate-pulse'}`}>
                   <div className={`text-sm font-semibold flex items-center justify-between ${systemState === 'fault' ? 'text-red-400' : 'text-orange-400'}`}>
                     {systemState === 'fault' ? (
                       <span className="text-lg w-full text-center font-bold">🚨 Relay TRIPPED</span>
                     ) : (
                       <>
                         <span>⏳ Tripping in:</span>
                         <span className="text-xl font-mono">{countdown} sec</span>
                       </>
                     )}
                   </div>
                 </div>
               )}
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-surface-400 uppercase tracking-wider">
                     Confidence Score
                   </span>
                   <span className="text-white font-mono">
                     {(prediction.probability * 100).toFixed(2)}%
                   </span>
                 </div>
               </div>
             </div>
           </div>

           {/* Location Card */}
           <div className={`glass-panel p-6 rounded-xl border ${systemState === 'fault' ? 'border-red-500/50 bg-red-500/5' : 'border-surface-700'}`}>
             <h3 className="font-semibold flex items-center gap-2 text-white mb-4">
               <Crosshair className="text-blue-400" /> TDR Location Data
             </h3>
             
             <div className="bg-surface-900 border border-surface-800 rounded-lg p-4 mb-4 relative overflow-hidden">
               <div className="absolute top-2 right-2 flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-surface-600 animate-pulse delay-75"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-surface-600 animate-pulse delay-150"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
               </div>
               <div className="text-surface-500 text-xs uppercase mb-1 tracking-wider">Estimated Distance</div>
               <div className="text-3xl font-mono text-white flex items-baseline gap-1">
                 {systemState === 'normal' ? '---' : systemState === 'warning' ? '412.5' : '1,054.2'} 
                 <span className="text-sm text-surface-400">{systemState === 'normal' ? '' : 'meters'}</span>
               </div>
             </div>

             {systemState !== 'normal' && (
               <div className="flex items-start gap-2 text-sm">
                 <MapPin className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
                 <span className="text-surface-300">
                   {systemState === 'warning' ? 'Zone 4: North Perimeter near Gate B.' : 'Zone 7: East Forest Boundary.'}
                 </span>
               </div>
             )}
           </div>

           {/* Event Log Snapshot */}
           <div className="glass-panel p-4 rounded-xl border border-surface-700 flex-1">
             <h3 className="font-semibold text-white mb-3 text-sm">Recent Alerts</h3>
             <div className="space-y-2">
               {systemState === 'fault' && (
                 <div className="bg-red-500/10 border border-red-500/20 p-2 rounded text-xs text-red-100 flex gap-2">
                   <span className="text-red-400 font-mono">10:42:01</span> Relay 7A tripped (Overcurrent)
                 </div>
               )}
               {systemState !== 'normal' && (
                 <div className="bg-orange-500/10 border border-orange-500/20 p-2 rounded text-xs text-orange-100 flex gap-2">
                   <span className="text-orange-400 font-mono">10:41:15</span> AI detects high-frequency anomaly
                 </div>
               )}
                 <div className="bg-surface-800 border border-surface-700 p-2 rounded text-xs text-surface-300 flex gap-2">
                   <span className="text-surface-500 font-mono">08:00:00</span> System initialized successfully
                 </div>
             </div>
           </div>

        </div>

      </div>
    
    </div>
  );
}
