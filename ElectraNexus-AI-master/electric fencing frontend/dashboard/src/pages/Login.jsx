import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldAlert, Eye, EyeOff, Lock, Network } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-brand-500/30 text-surface-50 relative overflow-hidden">
      
      {/* High-tech background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.9),rgba(15,23,42,0.9)),url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center flex-shrink-0 items-center gap-2 mb-6">
          <div className="p-3 bg-brand-500/10 rounded-xl text-brand-400 border border-brand-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Network size={36} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-widest uppercase">
          Sector Oversight
        </h2>
        <p className="mt-2 text-center text-sm text-brand-400 font-mono flex items-center justify-center gap-2">
          <Lock size={14}/> RESTRICTED ACCESS TERMINAL
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-panel py-8 px-4 sm:rounded-3xl sm:px-10 border border-brand-500/30 relative overflow-hidden group">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-surface-400 uppercase tracking-wider mb-2">
                Operator Clearance ID
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fenceguard.gov"
                  className="appearance-none block w-full px-4 py-3 border border-surface-700 rounded-xl bg-surface-900/50 text-white font-mono placeholder-surface-600 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono text-surface-400 uppercase tracking-wider mb-2">
                Decryption Key
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  className="appearance-none block w-full px-4 py-3 border border-surface-700 rounded-xl bg-surface-900/50 text-white font-mono placeholder-surface-600 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-500 hover:text-brand-400 transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-surface-500 font-mono flex items-center gap-1">
                <ShieldAlert size={12} className="text-yellow-500"/> IP Tracked
              </p>
              <NavLink to="/signup" className="text-xs text-brand-400 hover:text-brand-300 font-mono transition-colors border-b border-brand-500/30 hover:border-brand-400 pb-0.5">
                REQUEST ACCESS
              </NavLink>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-brand-500/50 rounded-xl text-sm text-white bg-brand-500/20 hover:bg-brand-500/40 focus:outline-none transition-all font-mono font-bold tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] uppercase cursor-pointer"
              >
                Initiate Handshake
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
