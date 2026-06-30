import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ShieldCheck, User, Fingerprint, MapPin, Activity, HardDrive, BellRing, Settings2, LogOut, Zap } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();

  // Protect the route if no user is found
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full flex-1 flex flex-col pt-8 pb-16 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto px-4 w-full">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase flex items-center gap-3">
              <Fingerprint className="text-brand-400" size={32} />
              Operator Profile
            </h1>
            <p className="text-surface-400 font-mono mt-2 text-xs md:text-sm">ID: {user.email.split('@')[0].toUpperCase()}-X99 // CLEARANCE VERIFIED</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 border border-red-500/30 rounded-xl font-mono text-sm transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] cursor-pointer tracking-wider">
            <LogOut size={16} /> END SESSION
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Identity Card */}
          <div className="md:col-span-1 border border-surface-700 rounded-3xl overflow-hidden glass-panel relative group h-fit">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-brand-500 to-cyan-500"></div>
            <div className="p-8 pb-6 flex flex-col items-center text-center relative z-10">
              <div className="w-28 h-28 rounded-full bg-brand-500/10 border-2 border-brand-500/50 flex items-center justify-center text-5xl text-brand-400 font-bold mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide truncate w-full">{user.name}</h2>
              <p className="text-brand-400 font-mono text-sm mt-1 mb-6 flex items-center justify-center gap-1">
                <ShieldCheck size={14} /> {user.clearance}
              </p>
              
              <div className="w-full space-y-2">
                <div className="bg-surface-900/50 rounded-lg py-2.5 px-3 border border-surface-800 text-xs text-surface-400 font-mono flex justify-between items-center">
                  <span>ROLE</span>
                  <span className="text-white bg-surface-800 px-2 py-0.5 rounded text-[10px]">{user.role}</span>
                </div>
                <div className="bg-surface-900/50 rounded-lg py-2.5 px-3 border border-surface-800 text-xs text-surface-400 font-mono flex justify-between items-center">
                   <span>ORG</span>
                   <span className="text-white flex items-center gap-1 bg-surface-800 px-2 py-0.5 rounded text-[10px]"><Zap size={10} className="text-yellow-400"/> NATIONAL GRID</span>
                </div>
                <div className="bg-surface-900/50 rounded-lg py-2.5 px-3 border border-surface-800 text-xs text-surface-400 font-mono flex justify-between items-center">
                   <span>EMAIL</span>
                   <span className="text-white truncate max-w-[120px]" title={user.email}>{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
             {/* Security Overview */}
             <div className="glass-panel p-6 rounded-3xl border border-surface-700">
                <h3 className="text-lg font-bold text-white border-b border-surface-800 pb-3 mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-green-400" /> Active Session Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-surface-900/50 p-4 rounded-xl border border-surface-800 hover:border-surface-600 transition-colors">
                    <p className="text-xs text-surface-500 font-mono mb-1">TERMINAL LOGIN TIME</p>
                    <p className="text-white font-mono flex items-center gap-2 text-sm">{user.loginTime} <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span></p>
                  </div>
                  <div className="bg-surface-900/50 p-4 rounded-xl border border-surface-800 hover:border-surface-600 transition-colors">
                    <p className="text-xs text-surface-500 font-mono mb-1">IP ADDRESS TRACKING</p>
                    <p className="text-white font-mono flex items-center gap-2 text-sm">10.4.52.199 <MapPin size={12} className="text-brand-400"/></p>
                  </div>
                  <div className="sm:col-span-2 bg-surface-900/50 p-4 rounded-xl border border-surface-800">
                    <p className="text-xs text-surface-500 font-mono mb-2">AUTHENTICATION NODE</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-mono text-sm truncate pr-2">SECURE-AUTH-V4.2.1-PROD // TLS-1.3</p>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded font-mono text-[10px] whitespace-nowrap">ENCRYPTED</span>
                    </div>
                  </div>
                </div>
             </div>

             {/* System Preferences */}
             <div className="glass-panel p-6 rounded-3xl border border-surface-700">
                <h3 className="text-lg font-bold text-white border-b border-surface-800 pb-3 mb-4 flex items-center gap-2">
                  <Settings2 size={18} className="text-purple-400" /> Dashboard Parameters
                </h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 hover:bg-surface-800/50 rounded-xl transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-surface-800 rounded-lg text-surface-400"><BellRing size={18}/></div>
                       <div>
                         <p className="text-sm font-medium text-white">Critical Alert Pings</p>
                         <p className="text-xs text-surface-500">Enable audible sirens for map anomalies.</p>
                       </div>
                     </div>
                     <div className="w-11 h-6 bg-brand-500 rounded-full relative cursor-pointer border border-brand-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)] flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5"></div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between p-3 hover:bg-surface-800/50 rounded-xl transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-surface-800 rounded-lg text-surface-400"><HardDrive size={18}/></div>
                       <div>
                         <p className="text-sm font-medium text-white">Data Cache Integrity</p>
                         <p className="text-xs text-surface-500">Store map telemetry locally strictly for 24h.</p>
                       </div>
                     </div>
                     <div className="w-11 h-6 bg-surface-800 rounded-full relative cursor-pointer border border-surface-700 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-surface-500 absolute top-0.5 left-0.5"></div>
                     </div>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
